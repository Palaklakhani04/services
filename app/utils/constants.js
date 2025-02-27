
export const INT_NUMBER_REGEX = /^[0-9]+$|^$/;
export const STRING_REGEX = /^[a-zA-Z]*$/;
export const NAME_REGEX = /^[a-zA-Z\s]*$/;
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
export const PHONE_REGEX = /^[0-9]{5,11}$/;
export const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
export const FILE_NAME_REGEX = /^[A-Za-z0-9.]+$/;
export const PAN_REGEX = /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/;
export const WEBURL_REGEX = /^(https?|ftp):\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[^\s]*)?$/;
export const PICODE_REGEX = /^[0-9]{6}$/;

export const IMG_REGEX = ['image/jpeg', 'image/png', 'image/webp'];
export const PDF_REGEX = ['application/pdf', 'application/txt', 'application/doc', 'application/ppt', 'application/docx', 'image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

export const DOC_IMG_REGEX = /(\.(jpg|jpeg|png|pdf))$/g;



export const COUNTRY_SEARCH_REGEX = /^[A-Za-z0-9+-\s}]{0,12}$|^$/;

export const PASSWOR_LOWER_REGEX = /^(?=.*[a-z]).+$/;
export const PASSWOR_UPPER_REGEX = /^(?=.*[A-Z]).+$/;
export const PASSWOR_NUMBER_REGEX = /^(?=.*[0-9]).+$/;
export const PASSWOR_SYMBOL_REGEX = /^(?=.*[@$!%*?&]).+$/;

export const PAN_NO_REGEX = /^[a-zA-Z0-9]{0,10}$/;

export const GST_NO_REGEX = /^[a-zA-Z0-9]{0,15}$/;

export const INT_TIME_REGEX = /^[0-9:]{0,5}$/;
export const TIME_REGEX = /^(0?[1-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

export const HM_REGEX = /^\d{0,2}(:?\d{0,2})?$/;




