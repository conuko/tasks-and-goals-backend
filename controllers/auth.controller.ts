import auth from "../services/auth.service";
import createError from "http-errors";

class authController {
  /* Register new user */
  static register = async (
    req: { body: any },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: {
          (arg0: { status: boolean; message: string; data: any }): void;
          new (): any;
        };
      };
    },
    next: (arg0: any) => void
  ) => {
    try {
      const user = await auth.register(req.body);
      res.status(200).json({
        status: true,
        message: "User created successfully",
        data: user,
      });
    } catch (e: any) {
      next(createError(e.statusCode, e.message));
    }
  };

  /* Login as a user */
  static login = async (
    req: { body: any },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: {
          (arg0: { status: boolean; message: string; data: any }): void;
          new (): any;
        };
      };
    },
    next: (arg0: any) => void
  ) => {
    try {
      const data = await auth.login(req.body);
      res.status(200).json({
        status: true,
        message: "Account login successful",
        data,
      });
    } catch (e: any) {
      next(createError(e.statusCode, e.message));
    }
  };
}

export default authController;
