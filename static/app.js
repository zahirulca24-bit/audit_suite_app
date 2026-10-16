const { createApp } = Vue;

createApp({
  data() {
    return {
      activeTab: 'profile',
      loading: false,
      generating: false,
      copied: false,
      clients: [],
      selectedClientId: 1,
      currentClient: {},
      shareholders: [],
      recentDocs: [],
      tasks: [],

      // Current User Simulation (Manager by default, switchable to Student)
      currentUser: {
        id: 1,
        name: "Audit Firm Manager",
        email: "manager@audit.com",
        role: "manager" // 'manager' or 'student'
      },

      // Transfer Form state
      transferForm: {
        transferor_id: null,
        transferee_id: null,
        share_count: 25000,
        consideration_type: 'Gift',
        consideration_amount: 0,
        distinctive_from: 49001,
        distinctive_to: 74000,
        transfer_date: '10-10-2026',
        assistant_name: 'Hemadry'
      },
      transferResult: null,

      // Annual return state
      availableYears: ['2020-2021', '2021-2022', '2022-2023', '2023-2024', '2024-2025'],
      selectedYears: ['2020-2021', '2021-2022', '2022-2023', '2023-2024', '2024-2025'],
      auditorName: 'FAMES & R',
      latestAgmDate: '24th October, 2024',
      annualResult: null,

      // Modals
      showAddClientModal: false,
      showAddShareholderModal: false,
      showNewTaskModal: false,
      showRejectModal: false,
      rejectTaskId: null,
      rejectComment: '',

      // Form Models
      newClientForm: {
        company_name: '',
        reg_no: '',
        inc_date: '',
        registered_address: '',
        authorized_capital: 10000000,
        paid_up_capital: 10000000,
        share_value: 100,
        tin_no: '',
        bin_no: '',
        drive_folder_link: ''
      },
      newShForm: {
        name: '',
        father_name: '',
        mother_name: '',
        address: '',
        designation: 'Director',
        share_count: 1000
      },
      newTaskForm: {
        service_type: 'Share Transfer (Form 117)',
        title: ''
      }
    };
  },
  computed: {
    pendingTasksCount() {
      return this.tasks.filter(t => t.status === 'SUBMITTED').length;
    }
  },
  mounted() {
    this.fetchClients();
    this.fetchTasks();
  },
  methods: {
    tabClass(tab) {
      if (this.activeTab === tab) {
        return 'bg-emerald-600 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition whitespace-nowrap shadow-sm';
      }
      return 'text-slate-300 hover:text-white hover:bg-slate-700 font-medium text-xs px-3.5 py-2 rounded-lg transition whitespace-nowrap';
    },
    formatNum(n) {
      if (!n && n !== 0) return '0';
      return Number(n).toLocaleString('en-IN');
    },
    calcPercentage(shares) {
      if (!this.currentClient.paid_up_capital || !shares) return '0.00';
      const totalShares = this.currentClient.paid_up_capital / (this.currentClient.share_value || 100);
      return ((shares / totalShares) * 100).toFixed(2);
    },
    designationBadge(desig) {
      if (!desig) return 'bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded font-medium';
      if (desig.includes('Managing Director')) return 'bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded font-semibold';
      if (desig.includes('Chairman')) return 'bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded font-semibold';
      if (desig.includes('Director')) return 'bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-semibold';
      return 'bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded font-medium';
    },
    taskStatusBadge(status) {
      if (status === 'SUBMITTED') return 'bg-amber-100 text-amber-800 border border-amber-300 text-xs px-2 py-0.5 rounded font-bold uppercase';
      if (status === 'APPROVED') return 'bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs px-2 py-0.5 rounded font-bold uppercase';
      if (status === 'REJECTED') return 'bg-rose-100 text-rose-800 border border-rose-300 text-xs px-2 py-0.5 rounded font-bold uppercase';
      return 'bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded font-semibold uppercase';
    },
    taskCardClass(status) {
      if (status === 'SUBMITTED') return 'bg-amber-50/40 border-amber-200';
      if (status === 'APPROVED') return 'bg-emerald-50/30 border-emerald-200';
      if (status === 'REJECTED') return 'bg-rose-50/40 border-rose-200';
      return 'bg-white border-slate-200';
    },
    toggleUserRole() {
      if (this.currentUser.role === 'manager') {
        this.currentUser = { id: 2, name: "Articled Student (Trainee)", email: "student@audit.com", role: "student" };
      } else {
        this.currentUser = { id: 1, name: "Audit Firm Manager", email: "manager@audit.com", role: "manager" };
      }
    },
    async fetchClients() {
      this.loading = true;
      try {
        const res = await fetch('/api/clients');
        this.clients = await res.json();
        if (this.clients.length > 0) {
          this.selectedClientId = this.clients[0].id;
          await this.fetchClientDetail();
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
    async fetchClientDetail() {
      if (!this.selectedClientId) return;
      try {
        const res = await fetch(`/api/clients/${this.selectedClientId}`);
        const data = await res.json();
        this.currentClient = data.client;
        this.shareholders = data.shareholders;
        this.recentDocs = data.recent_docs || [];

        if (this.shareholders.length >= 2) {
          this.transferForm.transferor_id = this.shareholders[0].id;
          this.transferForm.transferee_id = this.shareholders[this.shareholders.length - 1].id;
        }
      } catch (e) {
        console.error(e);
      }
    },
    async fetchTasks() {
      try {
        const res = await fetch('/api/tasks');
        this.tasks = await res.json();
      } catch (e) {
        console.error(e);
      }
    },
    async createClient() {
      try {
        const res = await fetch('/api/clients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newClientForm)
        });
        const data = await res.json();
        this.showAddClientModal = false;
        await this.fetchClients();
        this.selectedClientId = data.client_id;
        await this.fetchClientDetail();
        alert('New company created successfully!');
      } catch (e) {
        alert('Failed to add company');
      }
    },
    async createShareholder() {
      try {
        await fetch(`/api/clients/${this.selectedClientId}/shareholders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newShForm)
        });
        this.showAddShareholderModal = false;
        this.newShForm = { name: '', father_name: '', mother_name: '', address: '', designation: 'Director', share_count: 1000 };
        await this.fetchClientDetail();
      } catch (e) {
        alert('Failed to add member');
      }
    },
    async deleteShareholder(shId) {
      if (!confirm('Are you sure you want to remove this member?')) return;
      try {
        await fetch(`/api/shareholders/${shId}`, { method: 'DELETE' });
        await this.fetchClientDetail();
      } catch (e) {
        alert('Failed to delete member');
      }
    },
    async submitTask() {
      try {
        await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_id: this.selectedClientId,
            student_id: this.currentUser.id,
            service_type: this.newTaskForm.service_type,
            title: this.newTaskForm.title,
            submission_data: { client_name: this.currentClient.company_name }
          })
        });
        this.showNewTaskModal = false;
        this.newTaskForm.title = '';
        await this.fetchTasks();
        alert('Draft submitted to Manager for review!');
      } catch (e) {
        alert('Submission failed');
      }
    },
    async approveTask(taskId) {
      try {
        await fetch(`/api/tasks/${taskId}/approve`, { method: 'POST' });
        await this.fetchTasks();
        alert('Filing draft approved by Manager and synced to Google Drive!');
      } catch (e) {
        alert('Approval failed');
      }
    },
    openRejectModal(taskId) {
      this.rejectTaskId = taskId;
      this.rejectComment = '';
      this.showRejectModal = true;
    },
    async confirmReject() {
      try {
        await fetch(`/api/tasks/${this.rejectTaskId}/reject`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ comment: this.rejectComment })
        });
        this.showRejectModal = false;
        await this.fetchTasks();
        alert('Feedback sent back to student for correction.');
      } catch (e) {
        alert('Error sending feedback');
      }
    },
    async generateTransfer() {
      this.generating = true;
      this.transferResult = null;
      try {
        const payload = {
          client_id: this.selectedClientId,
          ...this.transferForm,
          user_id: this.currentUser.id
        };
        const res = await fetch('/api/generate/share-transfer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        this.transferResult = await res.json();
        await this.fetchClientDetail();
      } catch (e) {
        alert('Error generating share transfer package');
        console.error(e);
      } finally {
        this.generating = false;
      }
    },
    async generateAnnualReturns() {
      this.generating = true;
      this.annualResult = null;
      try {
        const payload = {
          client_id: this.selectedClientId,
          fy_list: this.selectedYears,
          agm_date: this.latestAgmDate,
          auditor_name: this.auditorName
        };
        const res = await fetch('/api/generate/annual-returns', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        this.annualResult = await res.json();
        await this.fetchClientDetail();
      } catch (e) {
        alert('Error generating annual returns');
        console.error(e);
      } finally {
        this.generating = false;
      }
    },
    copyChecklist() {
      const text = `${this.currentClient.company_name}\nHEMADRY SIGNING & NOTARY INSTRUCTIONS:\n1. Form 117 Transfer: Transferor, Transferee, 2 Witnesses & MD sign.\n2. Board Resolution: All Directors present sign.\n3. Affidavit: Tk. 300 Non-judicial stamp + Notary Public.\n4. Form IX & XII: Candidate & MD sign.\nNote: Black ink pen only!`;
      navigator.clipboard.writeText(text);
      this.copied = true;
      setTimeout(() => { this.copied = false; }, 2000);
    }
  }
}).mount('#app');
