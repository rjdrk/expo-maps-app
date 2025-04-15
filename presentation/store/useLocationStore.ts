import { getCurrentLocation, watchCurrentPosition } from "@/core/actions/location/location";
import { LatLng } from "@/infrastructure/interfaces/lat-lng";
import { LocationSubscription } from "expo-location";
import { create } from "zustand";

interface LocationState {
    lastKnowLocation: LatLng | null;
    userLocationList: LatLng[];
    watchSuscriptionID: LocationSubscription | null;
    getLocation: () => Promise<LatLng>;
    watchLocation: () => void;
    clearWatchLocation: () => void;
}


export const usseLocationStore = create<LocationState>()((set, get) => ({
    lastKnowLocation: null,
    userLocationList: [],
    watchSuscriptionID: null,

    getLocation: async () => {
        const location = await getCurrentLocation();
        set({ lastKnowLocation: location });
        return location;
    },

    watchLocation: async () => {
        const oldSubscription = get().watchSuscriptionID;
        if (oldSubscription !== null) {
            get().clearWatchLocation();
        }
        const watchsubscription = await watchCurrentPosition(
            (latLng) => {
                set({
                    lastKnowLocation: latLng,
                    userLocationList: [...get().userLocationList, latLng]
                })
            }
        );

        set({ watchSuscriptionID: watchsubscription });
    },

    clearWatchLocation: () => {
        const subscription = get().watchSuscriptionID;

        if (subscription !== null) {
            subscription.remove();
        }
    }
}));
