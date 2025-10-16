const sidebar = $state({
	opened: false
});

export const setSidebar = (value: boolean): void => {
	sidebar.opened = value;
};

export { sidebar };
