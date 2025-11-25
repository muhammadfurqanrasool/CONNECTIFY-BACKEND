export function InternalServerError(Response,error={message: "Internal Server Error!"}) {
    Response.status(500).json({message: error.message});
}