import AddressInterface from "../Interfaces/AddressInterface"

class AddressModel implements AddressInterface {
  address: string
  locale: object[]
  hour: string
  constructor(address: string, locale: object[], hour: string) {
    this.address = address
    this.locale = locale
    this.hour = hour
  }

}

export default AddressModel