export default class UsersDTOReturn {

    constructor (user) {

        this._id = user._id,
        this.name = user.name,
        this.surname = user.surname,
        this.username = user.username,
        this.email = user.email,
        this.role = user.role,
        this.cart = user.cart,
        this.tickets = user.tickets
    }
}