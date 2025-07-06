import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { QuickChatDto } from '../entity/quick-chat-dto';

@Injectable({
  providedIn: 'root'
})
export class QuickChatService {

  constructor(private dataService: DataService) { }

  getAllUserConversations(loggedInUserId: any) {
    return this.dataService.getObjectsWithPath(`chat/get-conversations-of-users/${loggedInUserId}`);
  }

  saveUserCommunication(newConversation: QuickChatDto) {
    return this.dataService.postDataWithOutSpinnerLoading("chat/save-user-communication", newConversation);
  }

  getAllChatsOfSelectedUser(senderId: string, receverId: string) {
    return this.dataService.getObjectsWithPathWithOutSpinnerLoading(`chat/get-all-chats/${senderId}/${receverId}`);
  }
}
