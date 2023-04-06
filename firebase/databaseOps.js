const firebase = require("firebase/database");
const firebaseApp = require("./initFirebase");

const db = firebase.getDatabase(firebaseApp);
const databaseRef = firebase.ref(db);

exports.fetchPictures = async () => {
  return (
    await firebase.get(firebase.child(databaseRef, "database/pictureGrid/"))
  ).val();
};

exports.fetchTableList = async () => {
  const tableArray = [];
  const tableList = (
    await firebase.get(firebase.child(databaseRef, "database/tables/"))
  ).val();
  Object.keys(tableList).forEach((objKey) => {
    tableArray.push({ tableName: objKey, seatList: tableList[objKey] });
  });
  return tableArray;
};

exports.fetchWishes = async () => {
  const wishesData = (
    await firebase.get(firebase.child(databaseRef, "database/wishes/"))
  ).val();
  const wishesArray = [];
  Object.keys(wishesData).forEach((key) => {
    wishesArray.push(wishesData[key]);
  });
  return wishesArray;
};

exports.makeWish = async (wishText, admin) => {
  const newWishKey = firebase.push(
    firebase.child(databaseRef, "database/wishes/")
  ).key;
  const updates = {};
  updates["/database/wishes/" + newWishKey] = {
    id: newWishKey,
    wish: wishText,
    isAdmin: admin,
  };

  return await firebase.update(databaseRef, updates);
};

exports.handleWishUpdate = async () => {
  let update = [];
  const wishRef = firebase.ref(db, "database/wishes");
  firebase.onValue(wishRef, (snapshot) => {
    const wishData = snapshot.val();
    Object.keys(wishData).forEach((key) => {
      update.push(wishData[key]);
    });
  });

  return update;
};
