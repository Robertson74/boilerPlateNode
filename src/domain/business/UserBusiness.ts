/**
 * @file UserBusiness.ts - Business layer for User entity
 * @author Michael Robertson
 * @version 0.0.1
 */

import { User } from "../../shared/entities/User";
import { BaseBusiness } from "./baseInterface/BaseBusiness";

export class UserBusiness extends BaseBusiness<User> {
}
