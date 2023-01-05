from fastapi import HTTPException, status


class HTTPUnauthorized(HTTPException):
    def __init__(self, msg=None):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"msg": msg},
        )


class HTTPConflict(HTTPException):
    def __init__(self, msg=None):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail={"msg": msg},
        )
