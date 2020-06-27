const state={
    isclose:JSON.parse(sessionStorage.getItem('isCollapse'))||false //leftnav的开关
}
const getters={
           
}
const mutations={
    CHANGE_STATUS(state){
        state.isclose=!state.isclose
        sessionStorage.setItem('isCollapse',JSON.stringify(state.isclose))
    }
}
const actions={

}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}