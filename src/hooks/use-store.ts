import { Store } from "@reduxjs/toolkit";
import { useStore } from "react-redux";

export const useAppStore: () => Store = useStore;
