function preSaveHook(doc, next) {
  doc.updatedAt = new Date()
  next()
}

export default {
  preSaveHook
}
