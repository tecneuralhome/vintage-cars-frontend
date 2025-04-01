import { Component, OnInit  } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-notification',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-notification.component.html',
  styleUrl: './admin-notification.component.css'
})
export class AdminNotificationComponent implements OnInit {
  bookingList: any[] = [];
  filteredBookingList: any[] = [];
  isLoading = true;
  totalCount: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchQuery: string = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.fetchBookingList();
  }

  fetchBookingList(): void {
    const params = {
      page: this.currentPage.toString(),
      limit: this.itemsPerPage.toString()
    };

    this.bookingService.getBookingList(params).subscribe({
      next: (response) => {
        this.bookingList = response.bookinglist;
        this.filteredBookingList = [...this.bookingList];
        this.isLoading = false;
        this.totalCount = response.totalCount;
      },
      error: (error) => {
        console.error('Error fetching booking list:', error);
        this.isLoading = false;
      },
    });
  }


  filterBookings(): void {
    if (!this.searchQuery) {
      this.filteredBookingList = [...this.bookingList]; // Reset to full list when search is empty
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredBookingList = this.bookingList.filter((booking) =>
        booking.name.toLowerCase().includes(query) ||
        booking.email.toLowerCase().includes(query) ||
        booking.number.toString().includes(query) ||
        booking.eventdate.toLowerCase().includes(query)
      );
    }
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return; // Prevent invalid page numbers
    }
    this.currentPage = page;
    this.fetchBookingList();
  }
  

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.itemsPerPage);
  }


}
