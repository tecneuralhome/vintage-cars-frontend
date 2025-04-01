import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationComponent } from '../../user/notification/notification.component';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-app-users',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NotificationComponent ],
  templateUrl: './app-users.component.html',
  styleUrl: './app-users.component.css'
})
export class AppUsersComponent implements OnInit {
  isLoading = true;
  users: any[] = [];
  filteredUsers: any[] = [];
  totalCount: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchQuery: string = '';

  selectedUser: any = null; 
  editForm!: FormGroup;

    // Sorting variables
    sortField: string | null = null;
    sortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private authservice: AuthService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.editForm = this.fb.group({
      username: ['', Validators.required], 
    });
  }

  ngOnInit(): void {
    this.fetchUserList();
  }

  fetchUserList(): void {
    const params = {
      page: this.currentPage.toString(),
      limit: this.itemsPerPage.toString()
    };

    this.authservice.getUserList(params).subscribe({
      next: (response: any) => {
        if (response.status) {
          this.users = response.users;
          this.filteredUsers = [...this.users];
          this.totalCount = response.totalCount;
          this.isLoading = false;
          this.applySorting();
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error fetching users:', error);
      }
    });
  }


  sortUsers(field: string): void {
    if (this.sortField === field) {
      // If already sorted by the field, toggle the order
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // Otherwise, set sorting field and default to ascending
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.applySorting();
  }

  applySorting(): void {
    if (this.sortField) {
      this.filteredUsers.sort((a, b) => {
        const valueA = a[this.sortField!].toLowerCase();
        const valueB = b[this.sortField!].toLowerCase();

        if (valueA < valueB) return this.sortOrder === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
  }

  filterUsers(): void {
    if (!this.searchQuery) {
      this.filteredUsers = [...this.users]; // Reset to full list when search is empty
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredUsers = this.users.filter((user) =>
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.number.toString().includes(query)
      );
    }
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return; // Prevent invalid page numbers
    }
    this.currentPage = page;
    this.fetchUserList();
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.itemsPerPage);
  }

  onEdit(user: any): void {
    console.log('Edit user:', user);
    if (user) {
      this.selectedUser = user;
      this.editForm!.patchValue({ username: user.username }); // Non-null assertion for editForm
    } else {
      console.error('Selected user is undefined.');
    }
  }
  
  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedData = this.editForm.value; // Only contains id and username
      this.authservice.updateUser(updatedData).subscribe({
        next: (response) => {
          this.editForm.reset(); // Clear the form after update
          this.selectedUser = null; // Clear the selected user
          this.fetchUserList();
          this.notificationService.showNotification('User data updated!', 'success');
        },
        error: (err) => {
          this.notificationService.showNotification('something went wrong!', 'error');
        },
      });
    } else {
    
    }
  }

  onDelete(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      console.log('Delete user:', userId);
     this.authservice.deleteUser({userids:userId}).subscribe({
      next: (response) => {
        console.log(response, "dlt user res")
        this.fetchUserList();
        this.notificationService.showNotification('User delete successful', 'success');
      },
      error: (err) =>{
        console.log(err, "dlt user err")
        this.notificationService.showNotification('something went wrong!', 'error');
      }
     });
    }
  }
}