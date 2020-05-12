const getters = {
    sidebar: state => state.app.sidebar,
    token: state => state.user.token,
    name: state => state.user.name,
    avatar: state => state.user.avatar,
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes
}

export default getters