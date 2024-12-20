import { defineStore } from "pinia";
import { Booking } from "./models/booking";
import { useAxios } from "../composables";
import { AxiosError } from "axios";

export const useBookingsStore = defineStore("bookings-store", {
  state: () => ({
    bookings: [] as Array<Booking>,
    bookingDetail: null,
  }),
  actions: {
    async createBooking(room_id, booked_on) {
      // facciamo una chiamata per creare una prenotazione

      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "bookings",
        method: "POST",
        data: { room_id, booked_on },
      });

      if (response instanceof AxiosError) {
        return false;
      }

      this.getBookings();
      // ritorniamo true se la chiamata è andata a buon fine x
      return true;
    },
    async getBookings() {
      // facciamo una chiamata per popolare le prenotazioni fatte
      // popoliamo lo store in caso positivo
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "bookings",
        method: "GET",
      });

      if (response instanceof AxiosError) {
        return false;
      }

      this.bookings = response;
      // ritorniamo true se la chiamata è andata a buon fine
      return true;
    },
    async getBookingDetail(id) {
      // facciamo una chiamata per accedere al dettaglio della prenotazione
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "bookings/" + id,
        method: "GET",
      });

      if (response instanceof AxiosError) {
        return;
      }

      // popoliamo lo store in caso positivo
      this.bookingDetail = response;
    },
    async deleteBooking(id) {
      // facciamo una chiamata per eliminare la prenotazione
      // in caso positivo eliminiamo la prenotazione da quelle disponibili
      const { sendRequest } = useAxios();
      const response = await sendRequest({
        url: "bookings/" + id,
        method: "DELETE",
      });

      if (response instanceof AxiosError) {
        return;
      }

      const oldBookings = [...this.bookings];
      const index = oldBookings.findIndex((value) => value.id === id);
      oldBookings.splice(index, 1);
      this.bookings = oldBookings;
    },
  },
  getters: {
    bookingsGetter(state) {
      return state.bookings;
    },
    bookingDetailGetter(state) {
      return state.bookingDetail;
    },
  },
});
