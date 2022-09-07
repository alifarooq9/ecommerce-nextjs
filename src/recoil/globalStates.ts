import { atom } from "recoil";

const userMenuState = atom({
	key: "useMenuState",
	default: false,
});

const miniCartState = atom({
	key: "miniCartState",
	default: false,
});

export { userMenuState, miniCartState };
