import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
  async findOrCreate(profile: {
    name: string;
    email: string;
    picture?: string;
  }) {
    let user = await this.findByEmail(profile.email);
  
    if (!user) {
        const telegramCode =
        "TG" + Math.floor(1000 + Math.random() * 9000);
      
      user = await this.create({
        name: profile.name,
        email: profile.email,
        picture: profile.picture,
      
        telegramCode,
      
        status: "pending",
        role: "user",
      });
    }
  
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async updateStatus(id: string, status: string): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }
  async updateTelegramChatId(id: string, chatId: string) {
    return this.userModel.findByIdAndUpdate(
      id,
      {
        telegramChatId: chatId,
      },
      {
        new: true,
      },
    );
  }
  async getApprovedUsers() {
    return this.userModel.find({
      status: "approved",
      telegramChatId: { $exists: true, $ne: null },
    });
  }
  async getStats() {
    const totalUsers = await this.userModel.countDocuments();
  
    const pendingUsers = await this.userModel.countDocuments({
      status: "pending",
    });
  
    const approvedUsers = await this.userModel.countDocuments({
      status: "approved",
    });
  
    const telegramLinked = await this.userModel.countDocuments({
      telegramChatId: { $exists: true, $ne: null },
    });
  
    return {
      totalUsers,
      pendingUsers,
      approvedUsers,
      telegramLinked,
    };
  }
}
