import dayjs from 'dayjs';
const LocalizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(LocalizedFormat);

export function filterNonNull(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
}

export function updateObjectInArray(array = [], obj = {}, findBy = 'id') {
  const index = array.findIndex((item) => item[findBy] === obj[findBy]);
  if (index !== -1) {
    const findObj = array[index];
    obj = { ...findObj, ...obj };
    array[index] = obj;
  } else {
    array.push(obj);
  }
  return array;
}

export function pick(object, keys) {
  return keys.reduce((obj, key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
}

export function transformMenuItems(arrayProp, code, title, id) {
  if (!arrayProp && !Array.isArray(arrayProp) && !arrayProp?.length) return;

  const arrayOfPickedKey = arrayProp.map((element) => {
    return pick(element, [code, title, id]);
  });

  if (arrayOfPickedKey?.length) {
    return arrayOfPickedKey.reduce((array, obj, i) => {
      array.push({
        title: obj[title],
        index: i,
        value: obj?.id,
        id: obj?.id,
        code: obj?.code,
      });
      return array;
    }, []);
  }
}

export function getCookie(cname) {
  if (!process.browser) {
    return;
  }

  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
}

export function setCookie(cName, cValue, timePeriod, type) {
  let date = new Date();
  if (type == 'days') {
    date.setTime(date.getTime() + timePeriod * 24 * 60 * 60 * 1000);
  } else {
    date.setTime(date.getTime() + timePeriod);
  }
  const expires = 'expires=' + date.toUTCString();
  document.cookie = cName + '=' + cValue + '; ' + expires + '; path=/';
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function prepareAttendees(listOfAttendees = []) {
  const data = listOfAttendees.reduce((prevValue, objOfAttendee) => {
    let attendeesArray = prevValue;
    let attendeesObj = {};

    let ticketsObj = { ...objOfAttendee.ticketsOfAttendee };
    delete ticketsObj.prices;
    delete ticketsObj.currency;
    delete ticketsObj.numberOfSeats;
    delete ticketsObj.attendeeType;
    delete ticketsObj.description;

    attendeesObj = {
      ticket: ticketsObj,
      title: 0,
      gender: objOfAttendee.details?.gender,
      name: objOfAttendee.details?.name,
      country: objOfAttendee.details?.country.label,
      state: objOfAttendee.details?.state.label,
      city: objOfAttendee.details?.city.label,
      phoneNo: {
        countryCode: objOfAttendee.details?.mobileCountryCode.label,
        number: objOfAttendee.details?.mobileNumber,
      },
      whatsAppNumber: {
        number: objOfAttendee.details?.whatsAppNumber,
        countryCode: objOfAttendee.details?.whatsappCountryCode?.label,
      },
      emailId: objOfAttendee.details?.emailId,
    };

    attendeesArray.push(attendeesObj);

    return attendeesArray;
  }, []);

  return data;
}

export function prepareBillingDetails(billingDetails) {
  return {
    ...billingDetails,
    ...{
      name: billingDetails?.name,
      city: billingDetails?.city?.label,
      state: billingDetails?.state?.label,
      country: billingDetails?.country?.label,
      contactNo: {
        countryCode: billingDetails?.mobileCountryCode?.label,
        number: billingDetails?.mobileNumber,
      },
      whatsAppNumber: {
        countryCode: billingDetails?.whatsappCountryCode?.label,
        number: billingDetails?.whatsAppNumber,
      },
    },
  };
}

export function filterNull(obj = {}) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}

export function filterNullArrayOfObj(array = []) {
  const arrayFiltered = [];

  array.forEach((obj) => {
    arrayFiltered.push(filterNull(obj));
  });

  return arrayFiltered;
}

export function findDifferenceBetweenDates(startDate, endDate) {
  const date1 = dayjs(startDate.split('T')[0]);
  const date2 = dayjs(endDate);
  return Math.ceil(date2.diff(date1, 'day', true));
}

export function imageHandler(src) {
  if (typeof src == 'string') {
    return src;
  } else if (src && src[0] != undefined) {
    return window.URL.createObjectURL(src[0]);
  } else if (src?.length != 0 && src) {
    return window.URL.createObjectURL(src);
  }
}

export function scheduleFromStartDateEndDate(startDate, endDate) {
  return Array.from({ length: findDifferenceBetweenDates(startDate, endDate) }, (_, i) => ({
    day: `Day ${i + 1}`,
    key: `day${i + 1}`,
    date:
      i == 0
        ? dayjs(startDate).format('dddd, D MMMM YYYY')
        : dayjs(dayjs(startDate).add(i, 'day')).format('dddd, D MMMM YYYY'),
  }));
}
