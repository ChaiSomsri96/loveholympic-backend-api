function preSaveHook(doc, next) {
  if (doc.isNew) {
    doc.genHashPassword();
  }
  next();
}

export default {
  preSaveHook,
};
