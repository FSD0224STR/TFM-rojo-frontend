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
    const concatArray = newDataDni.concat(newDataEmail, newDataName);
    return concatArray;
  } else {
    return data;
  }
};

export const sortBy = async (value, listData, order) => {
  if (value === "dni") {
    const dniSortData = listData.sort((a, b) => {
      const valA = a.dni !== undefined ? a.dni : 0;
      const valB = b.dni !== undefined ? b.dni : 0;

      return order === "ascending" ? valB - valA : valA - valB;
    });

    return dniSortData;
  } else if (value === "name") {
    const nameSortData = listData.sort((a, b) => {
      const valA = a.name.toLowerCase();
      const valB = b.name.toLowerCase();

      if (valA < valB) {
        return order === "ascending" ? 1 : -1;
      }
      if (valA > valB) {
        return order === "ascending" ? -1 : 1;
      }

      return 0;
    });

    return nameSortData;
  } else if (value === "email") {
    const emailSortData = listData.sort((a, b) => {
      const valA = a.email.toLowerCase();
      const valB = b.email.toLowerCase();

      if (valA < valB) {
        return order === "ascending" ? 1 : -1;
      }
      if (valA > valB) {
        return order === "ascending" ? -1 : 1;
      }

      return 0;
    });

    return emailSortData;
  } else if (value === "role") {
    const roleSortData = listData.sort((a, b) => {
      const valA = a.roles.toLowerCase();
      const valB = b.roles.toLowerCase();

      if (valA < valB) {
        return order === "ascending" ? 1 : -1;
      }
      if (valA > valB) {
        return order === "ascending" ? -1 : 1;
      }

      return 0;
    });

    return roleSortData;
  }
};

export const filterBy = (value, data) => {
  if (value !== "all") {
    const response = data.filter((user) => {
      if (user.roles == value) {
        return user;
      }
    });
    return response;
  } else {
    return data;
  }
};
