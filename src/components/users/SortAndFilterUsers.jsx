export const onSearch = (value, data) => {
  if (value !== undefined) {
    var newDataName = data.filter((user) => {
      var name = user.name.toLowerCase();
      if (name.includes(value)) {
        return user;
      }
    });
    var newDataEmail = data.filter((user) => {
      var email = user.email.split("@")[0].toLowerCase();
      if (email.includes(value)) {
        return user;
      }
    });

    var newDataDni = data.filter((user) => {
      if (user.dni !== undefined) {
        var dni = user.dni;
        if (dni.includes(value)) {
          return user;
        }
      }
    });
    // console.log(value);
    // if (newDataName.length) {
    //   return newDataName;
    // } else if (newDataEmail.length) {
    //   return newDataEmail;
    // } else if (newDataDni.length) {
    //   return newDataDni;
    // } else {
    //   return [];
    // }
    const concatArray = newDataDni.concat(newDataEmail, newDataName);
    return concatArray;
  } else {
    return data;
  }
};

export const sortBy = async (value, listData, order) => {
  //   console.log(listData);
  //   console.log(value);
  console.log(order);
  if (value === "dni") {
    const dniSortData = listData.sort((a, b) => {
      const valA = a.dni !== undefined ? a.dni : 0;
      const valB = b.dni !== undefined ? b.dni : 0;
      // console.log("a", valA);
      // console.log("b", valB);

      return order === "ascending" ? valB - valA : valA - valB;
    });

    // setTimeout(() => {
    return dniSortData;
    // }, 1000);
  } else if (value === "name") {
    const nameSortData = listData.sort((a, b) => {
      const valA = a.name.toLowerCase();
      const valB = b.name.toLowerCase();
      // console.log("a", valA);
      // console.log("b", valB);
      if (valA < valB) {
        return order === "ascending" ? 1 : -1;
        // return -1;
      }
      if (valA > valB) {
        return order === "ascending" ? -1 : 1;
      }

      // names must be equal
      return 0;
    });

    // setTimeout(() => {
    return nameSortData;
    // }, 1000);
  } else if (value === "email") {
    const emailSortData = listData.sort((a, b) => {
      const valA = a.email.toLowerCase();
      const valB = b.email.toLowerCase();
      // console.log("a", valA);
      // console.log("b", valB);
      if (valA < valB) {
        return order === "ascending" ? 1 : -1;
        // return -1;
      }
      if (valA > valB) {
        return order === "ascending" ? -1 : 1;
      }

      // names must be equal
      return 0;
    });

    // setTimeout(() => {
    return emailSortData;
    // }, 1000);
  } else if (value === "role") {
    const roleSortData = listData.sort((a, b) => {
      const valA = a.roles.toLowerCase();
      const valB = b.roles.toLowerCase();
      // console.log("a", valA);
      // console.log("b", valB);
      if (valA < valB) {
        return order === "ascending" ? 1 : -1;
        // return -1;
      }
      if (valA > valB) {
        return order === "ascending" ? -1 : 1;
      }

      // names must be equal
      return 0;
    });

    // setTimeout(() => {
    return roleSortData;
    // }, 1000);
  }
};

export const filterBy = (value, data) => {
  if (value !== "all") {
    const response = data.filter((user) => {
      if (user.roles == value) {
        // console.log(`roles: ${user.roles}`);
        return user;
      }
    });
    return response;
  } else {
    return data;
  }
  //   console.log(response);
};
