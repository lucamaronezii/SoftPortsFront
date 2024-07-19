import { CardProps } from "antd";
import { IUser } from "../../interfaces";

export interface IUserCard extends CardProps {
    user: IUser
}