/**
 * @file UserRepo.ts - User Repository
 * @author Michael Robertson
 * @version 0.0.1
 */
import { User } from "../../shared/entities/User";
import { BaseRepository } from "./baseInterface/baseRepo";

export class UserRepo extends BaseRepository<User> {
}
