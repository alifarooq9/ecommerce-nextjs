import { atom } from "recoil";

const userMenuState = atom({
	key: "useMenuState",
	default: false,
});

export default userMenuState;
