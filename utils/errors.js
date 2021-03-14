export const validationError = (res, msg) => {
    res.status(422).send({errors: {msg}});
}
export const unauthorizedError = (res, msg) => {
    res.status(401).send({errors: {msg}})
}
export const conflictError = res => {
    res.status(409).send({errors: {}})
}
