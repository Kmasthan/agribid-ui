import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  newMessage!: string | null;

  user: FarmerDto = new FarmerDto()
  intervalId: any;

  hoveredMsgIndex!: number | null;
  activeAccordianIndex!: number | null;

  isLargeScreen: boolean = false;
  isUserListOpen: boolean = true;
  isChatAreaOpen: boolean = true;

  constructor(private route: ActivatedRoute, private quickChatService: QuickChatService, private localStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // isPlatformBrowser() Guard this for safety, though it's browser-only anyway
    if (isPlatformBrowser(this.platformId)) {
      this.isLargeScreen = event.target.innerWidth > 1000;
      if (this.isLargeScreen) {
        this.isUserListOpen = true;
        this.isChatAreaOpen = true;
      } else {
        if (this.selectedReceiver) {
          this.showChatAreaAndHideUsersList();
        } else {
          this.showUsersListAndHideChatArea();
        }
      }
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (window.innerWidth > 1000) {
        this.isLargeScreen = true;
      } else {
        this.showUsersListAndHideChatArea();
      }
    }

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
    if (!this.isLargeScreen) {
      this.showChatAreaAndHideUsersList();
    }

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

  toggleUsersList() {
    this.showUsersListAndHideChatArea();
  }

  showUsersListAndHideChatArea() {
    this.isUserListOpen = true
    this.isChatAreaOpen = false;
  }

  showChatAreaAndHideUsersList() {
    this.isChatAreaOpen = true;
    this.isUserListOpen = false;
  }

  sendMessage() {
    this.newConversation = new QuickChatDto();
    this.newConversation.senderId = this.user.id;
    this.newConversation.senderName = this.user.name;
    this.newConversation.senderMobile = this.user.mobileNumber;
    this.newConversation.receverId = this.selectedReceiver.receverId;
    this.newConversation.receverName = this.selectedReceiver.receverName;
    this.newConversation.receverMobile = this.selectedReceiver.receverMobile;
    this.newConversation.message = this.newMessage?.trim() ? this.newMessage?.trim() : '';
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
