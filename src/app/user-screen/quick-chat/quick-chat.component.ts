import { Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QuickChatService } from './quick-chat.service';
import { LocalStorageService } from '../../local-storage.servive';
import { QuickChatDto } from '../entity/quick-chat-dto';
import { FarmerDto } from '../../agri-bid-home/entity/farmerDto';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-quick-chat',
  standalone: true,
  imports: [MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule,
    CommonModule],
  templateUrl: './quick-chat.component.html',
  styleUrl: './quick-chat.component.css'
})
export class QuickChatComponent implements OnInit, OnDestroy {

  userConversations: QuickChatDto[] = []
  selectedReceiver!: QuickChatDto | any;

  conversations: QuickChatDto[] = [];
  newConversation: QuickChatDto = new QuickChatDto();
  newMessage!: string;

  user: FarmerDto = new FarmerDto()
  intervalId: any;

  hoveredMsgIndex!: number | null;
  activeAccordianIndex!: number | null;

  constructor(private route: ActivatedRoute, private quickChatService: QuickChatService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.user = this.localStorageService.getLoggedInUser() != null ? JSON.parse(this.localStorageService.getLoggedInUser()!) : new FarmerDto();
    this.route.queryParams.subscribe(params => {
      if (params['chatDetails']) {
        this.selectedReceiver = JSON.parse(params['chatDetails']);
        this.selectUser(this.selectedReceiver);
        this.userConversations.push(this.selectedReceiver);
      }
    })
    this.getAllUserConversations();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }


  getAllUserConversations() {
    this.quickChatService.getAllUserConversations(this.user.id).subscribe({
      next: (data) => {
        this.userConversations = <QuickChatDto[]>data;
      },
      error: (error) => { },
      complete: () => { }
    })
  }

  selectUser(selectedConv: QuickChatDto) {
    this.selectedReceiver = selectedConv;
    this.quickChatService.getAllChatsOfSelectedUser(this.user.id, selectedConv.receverId).subscribe({
      next: (data) => {
        this.selectedReceiver.conversations = <QuickChatDto[]>data;
      },
      error: (error) => {
        this.selectedReceiver.conversations = [];
      },
      complete: () => {
        this.startIntervel();
      }
    })
  }

  // HostListener to detect clicks anywhere on the document
  @HostListener('document:click', ['$event'])
  onClick() {
    // Check if there's an active accordion
    if (this.activeAccordianIndex !== null) {
      let activeAccordian = document.getElementById('msgDetails' + this.activeAccordianIndex);
      if (activeAccordian) {
        activeAccordian.classList.remove('show');
      }
    }
  }

  sendMessage() {
    this.newConversation = new QuickChatDto();
    this.newConversation.senderId = this.user.id;
    this.newConversation.senderName = this.user.name;
    this.newConversation.senderMobile = this.user.mobileNumber;
    this.newConversation.receverId = this.selectedReceiver.receverId;
    this.newConversation.receverName = this.selectedReceiver.receverName;
    this.newConversation.receverMobile = this.selectedReceiver.receverMobile;
    this.newConversation.message = this.newMessage;
    this.newConversation.edited = false;
    this.newConversation.createdAt = new Date();
    this.newConversation.modifiedAt = new Date();
    this.selectedReceiver.conversations.push(this.newConversation);
    this.newMessage = '';

    this.quickChatService.saveUserCommunication(this.newConversation).subscribe({
      next: (data) => {
        console.log(data.message);
      },
      error: (error) => {
        console.log(error.message);
      },
      complete: () => { }
    })
  }

  startIntervel() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.selectUser(this.selectedReceiver);
      }, 30000)
    }
  }
}
