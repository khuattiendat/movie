export const checkPhone = (phone) => {
    console.log(phone)
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    return regexPhoneNumber.test(phone);
}
export const formatPrice = (price = 0) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export const reverseFormatPrice = (formattedPrice) => {
    return parseFloat(formattedPrice.replace(/,/g, ''));
}