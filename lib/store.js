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
	messages: [],
	setMessages: (val) => set(() => ({ messages: val })),
	isChatRoomMobile: false,
	setIsChatRoomMobile: (val) => set(() => ({ isChatRoomMobile: val })),
	isChatInfoMobile: false,
	setIsChatInfoMobile: (val) => set(() => ({ isChatInfoMobile: val })),
	isChatInfo: false,
	setIsChatInfo: (val) => set(() => ({ isChatInfo: val })),
	alias: { accountId: '', alias: '' },
	setAlias: (val) => set(() => ({ alias: val })),

	lastMessageSocket: {},
	setLastMessageSocket: (val) => set(() => ({ lastMessageSocket: val })),
	messageSocket: {},
	setMessageSocket: (val) => set(() => ({ messageSocket: val })),
	messageSocketCurrentUser: {},
	setMessageSocketCurrentUser: (val) =>
		set(() => ({ messageSocketCurrentUser: val })),
}))

export default useStore
