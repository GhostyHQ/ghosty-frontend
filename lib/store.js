import create from 'zustand'

const useStore = create((set, get) => ({
	currentUser: null,
	setCurrentUser: (user) => set(() => ({ currentUser: user })),
	initialized: false,
	setInitialized: (val) => set(() => ({ initialized: val })),
	userBalance: {},
	setUserBalance: (val) => set(() => ({ userBalance: val })),
	userProfile: {},
	setUserProfile: (val) => set(() => ({ userProfile: val })),
	currentChat: {},
	setCurrentChat: (val) => set(() => ({ currentChat: val })),
	chatList: [],
	setChatList: (val) => set(() => ({ chatList: val })),
}))

export default useStore
