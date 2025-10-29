// ============================================
// MAIN.JS - Sistem Pakar Diagnosa Padi
// ============================================

// ============================================
// FUNGSI UNTUK KONTAK.HTML
// ============================================

// Character counter for textarea
function initKontakPage() {
    const pesanTextarea = document.getElementById('pesan');
    const charCount = document.getElementById('char-count');

    if (pesanTextarea && charCount) {
        pesanTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            
            if (length >= 500) {
                charCount.classList.add('text-red-500', 'font-bold');
            } else {
                charCount.classList.remove('text-red-500', 'font-bold');
            }
        });
    }

    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nama = document.getElementById('nama').value;
            const email = document.getElementById('email').value;
            const pesan = document.getElementById('pesan').value;

            // Create email body
            const emailBody = `Nama: ${nama}%0D%0AEmail: ${email}%0D%0A%0D%0APesan:%0D%0A${encodeURIComponent(pesan)}`;
            
            // Create mailto link
            const mailtoLink = `mailto:admin@sistempakapadi.com?subject=Pesan dari ${encodeURIComponent(nama)}&body=${emailBody}`;

            // Open email client
            window.location.href = mailtoLink;

            // Show success message
            const successMessage = document.getElementById('success-message');
            if (successMessage) {
                successMessage.classList.remove('hidden');
            }

            // Reset form
            this.reset();
            charCount.textContent = '0';

            // Hide success message after 5 seconds
            setTimeout(() => {
                if (successMessage) {
                    successMessage.classList.add('hidden');
                }
            }, 5000);
        });
    }
}

// ============================================
// FUNGSI UNTUK LOGIN.HTML
// ============================================

function initLoginPage() {
    // Toggle password visibility
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');

    if (togglePassword && passwordInput && eyeIcon) {
        togglePassword.addEventListener('click', function () {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    }

    // Handle form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                const loginData = {
                    email: user.email,
                    name: user.name || email.split('@')[0],
                    loginTime: new Date().toISOString(),
                    remember: remember
                };
                if (remember) localStorage.setItem('userSession', JSON.stringify(loginData));
                else sessionStorage.setItem('userSession', JSON.stringify(loginData));
                alert('Login berhasil! Selamat datang ' + loginData.name);
                window.location.href = 'index.html';
            } else alert('Email atau password salah. Silakan coba lagi.');
        });
    }

    // Google login simulation
    const googleLoginBtn = document.getElementById('google-login-btn');
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', function () {
            alert('Login dengan Google belum diaktifkan.');
        });
    }
}

// ============================================
// FUNGSI UNTUK REGISTER.HTML
// ============================================

function initRegisterPage() {
    // Handle Register Form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('Password dan konfirmasi password tidak cocok!');
                return;
            }

            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            if (users.some(u => u.email === email)) {
                alert('Email sudah terdaftar!');
                return;
            }

            users.push({
                email,
                password
            });
            localStorage.setItem('registeredUsers', JSON.stringify(users));

            alert('Pendaftaran berhasil! Silakan login.');
            window.location.href = 'login.html';
        });
    }

    // Google Register Simulation
    const googleRegisterBtn = document.getElementById('google-register-btn');
    if (googleRegisterBtn) {
        googleRegisterBtn.addEventListener('click', function () {
            alert('Pendaftaran dengan Google belum diaktifkan.');
        });
    }
}

// ============================================
// FUNGSI UNTUK RIWAYAT.HTML
// ============================================

// Sample data
const sampleData = [
    {
        id: 1,
        date: '15 Januari 2025',
        time: '14:30',
        disease: 'Blast (Blas)',
        description: 'Penyakit jamur Pyricularia oryzae yang menyerang daun, batang, dan malai padi.',
        confidence: 87,
        solution: 'Aplikasi fungisida berbahan aktif trikasiklasol. Atur jarak tanam dan drainase yang baik.',
        symptoms: ['Bercak coklat pada daun', 'Daun mengering']
    },
    {
        id: 2,
        date: '10 Januari 2025',
        time: '10:15',
        disease: 'Hawar Daun Bakteri (BLB)',
        description: 'Penyakit yang disebabkan oleh bakteri Xanthomonas oryzae yang menyerang daun tanaman padi.',
        confidence: 75,
        solution: 'Gunakan bakterisida berbahan aktif oksitetrasiklin. Lakukan sanitasi lahan dan hindari genangan air berlebih.',
        symptoms: ['Daun menguning di bagian tepi', 'Bercak coklat pada daun']
    },
    {
        id: 3,
        date: '5 Januari 2025',
        time: '16:45',
        disease: 'Tungro',
        description: 'Penyakit virus yang ditularkan oleh wereng hijau, menyebabkan pertumbuhan terhambat.',
        confidence: 65,
        solution: 'Semprot dengan insektisida untuk mengendalikan wereng. Gunakan varietas tahan tungro.',
        symptoms: ['Pertumbuhan terhambat', 'Daun menguning']
    },
    {
        id: 4,
        date: '1 Januari 2025',
        time: '09:20',
        disease: 'Blast (Blas)',
        description: 'Penyakit jamur Pyricularia oryzae yang menyerang daun, batang, dan malai padi.',
        confidence: 92,
        solution: 'Aplikasi fungisida berbahan aktif trikasiklasol. Atur jarak tanam dan drainase yang baik.',
        symptoms: ['Bercak coklat pada daun', 'Malai patah']
    },
    {
        id: 5,
        date: '28 Desember 2024',
        time: '13:55',
        disease: 'Hawar Daun Bakteri (BLB)',
        description: 'Penyakit yang disebabkan oleh bakteri Xanthomonas oryzae yang menyerang daun tanaman padi.',
        confidence: 68,
        solution: 'Gunakan bakterisida berbahan aktif oksitetrasiklin. Lakukan sanitasi lahan dan hindari genangan air berlebih.',
        symptoms: ['Daun menguning di bagian tepi', 'Bercak coklat']
    }
];

// State management
let historyData = [];
let selectedRecord = null;
let currentPage = 1;
const itemsPerPage = 20;

// Load data from localStorage
function loadHistoryData() {
    const stored = localStorage.getItem('diagnosisHistory');
    
    if (stored) {
        try {
            const parsedData = JSON.parse(stored);
            if (parsedData && parsedData.length > 0) {
                historyData = parsedData;
            } else {
                historyData = [...sampleData];
                localStorage.setItem('diagnosisHistory', JSON.stringify(historyData));
            }
        } catch (e) {
            historyData = [...sampleData];
            localStorage.setItem('diagnosisHistory', JSON.stringify(historyData));
        }
    } else {
        historyData = [...sampleData];
        localStorage.setItem('diagnosisHistory', JSON.stringify(historyData));
    }
}

// Get paginated data
function getPaginatedData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return historyData.slice(startIndex, endIndex);
}

// Get total pages
function getTotalPages() {
    return Math.ceil(historyData.length / itemsPerPage);
}

// Update stats
function updateStats() {
    const totalRecords = document.getElementById('total-records');
    const showingFrom = document.getElementById('showing-from');
    const showingTo = document.getElementById('showing-to');
    const showingTotal = document.getElementById('showing-total');

    if (totalRecords) totalRecords.textContent = historyData.length;
    
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, historyData.length);
    
    if (showingFrom) showingFrom.textContent = historyData.length > 0 ? startIndex : 0;
    if (showingTo) showingTo.textContent = endIndex;
    if (showingTotal) showingTotal.textContent = historyData.length;
}

// Get confidence color
function getConfidenceColor(confidence) {
    if (confidence >= 80) return 'bg-green-100 text-green-800';
    if (confidence >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
}

// Render history cards
function renderHistory() {
    const container = document.getElementById('history-container');
    const emptyState = document.getElementById('empty-state');
    const paginationContainer = document.getElementById('pagination-container');
    
    if (!container) return;

    if (historyData.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        if (paginationContainer) paginationContainer.classList.add('hidden');
        updateStats();
        return;
    }
    
    if (emptyState) emptyState.classList.add('hidden');
    
    const paginatedData = getPaginatedData();
    
    container.innerHTML = paginatedData.map(item => `
        <div class="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-3">
                        <i class="fas fa-calendar text-gray-400"></i>
                        <span class="text-gray-600 text-sm">${item.date} • ${item.time}</span>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">${item.disease}</h3>
                    <div class="flex items-center gap-4 mb-3">
                        <div class="flex items-center gap-2">
                            <i class="fas fa-chart-line text-gray-400"></i>
                            <span class="text-sm text-gray-600">Tingkat Keyakinan</span>
                        </div>
                        <span class="px-3 py-1 rounded-full text-sm font-semibold ${getConfidenceColor(item.confidence)}">${item.confidence}%</span>
                    </div>
                    <div class="flex items-start gap-2 text-gray-600">
                        <i class="fas fa-pills mt-1 text-gray-400"></i>
                        <span class="text-sm">${item.solution}</span>
                    </div>
                </div>
                <div class="relative ml-4">
                    <button onclick="toggleDropdown(event, ${item.id})" class="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <div id="dropdown-${item.id}" class="dropdown-menu bg-white rounded-lg shadow-lg border border-gray-200 py-1 mt-2">
                        <button onclick="viewDetail(${item.id})" class="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm text-gray-700">
                            <i class="fas fa-eye text-blue-600"></i>
                            <span>Lihat Detail</span>
                        </button>
                        <button onclick="deleteRecord(${item.id})" class="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm text-gray-700">
                            <i class="fas fa-trash-alt text-red-600"></i>
                            <span>Hapus</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-200">
                <div class="flex items-center gap-2 text-gray-600">
                    <i class="fas fa-tasks text-gray-400"></i>
                    <span class="text-sm font-medium">Gejala:</span>
                    <span class="text-sm">${item.symptoms.length} gejala terdeteksi</span>
                </div>
            </div>
        </div>
    `).join('');

    updateStats();
    renderPagination();
    
    // Show pagination if needed
    if (paginationContainer) {
        if (historyData.length > itemsPerPage) {
            paginationContainer.classList.remove('hidden');
        } else {
            paginationContainer.classList.add('hidden');
        }
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render pagination
function renderPagination() {
    const totalPages = getTotalPages();
    const pageNumbers = document.getElementById('page-numbers');
    
    if (!pageNumbers) return;

    pageNumbers.innerHTML = '';

    // Calculate page range to show
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    // Adjust range if at the beginning or end
    if (currentPage <= 3) {
        endPage = Math.min(5, totalPages);
    }
    if (currentPage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - 4);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
        pageNumbers.innerHTML += `<button class="pagination-btn" onclick="goToPage(1)">1</button>`;
        if (startPage > 2) {
            pageNumbers.innerHTML += `<span class="px-2 text-gray-500">...</span>`;
        }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        pageNumbers.innerHTML += `<button class="pagination-btn ${activeClass}" onclick="goToPage(${i})">${i}</button>`;
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pageNumbers.innerHTML += `<span class="px-2 text-gray-500">...</span>`;
        }
        pageNumbers.innerHTML += `<button class="pagination-btn" onclick="goToPage(${totalPages})">${totalPages}</button>`;
    }

    // Update page display
    const currentPageDisplay = document.getElementById('current-page-display');
    const totalPagesDisplay = document.getElementById('total-pages-display');
    if (currentPageDisplay) currentPageDisplay.textContent = currentPage;
    if (totalPagesDisplay) totalPagesDisplay.textContent = totalPages;

    // Update button states
    const firstPageBtn = document.getElementById('first-page-btn');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const lastPageBtn = document.getElementById('last-page-btn');

    if (firstPageBtn) firstPageBtn.disabled = currentPage === 1;
    if (prevPageBtn) prevPageBtn.disabled = currentPage === 1;
    if (nextPageBtn) nextPageBtn.disabled = currentPage === totalPages;
    if (lastPageBtn) lastPageBtn.disabled = currentPage === totalPages;
}

// Go to page
function goToPage(page) {
    const totalPages = getTotalPages();
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderHistory();
}

// Toggle dropdown
function toggleDropdown(event, id) {
    event.stopPropagation();
    const dropdown = document.getElementById(`dropdown-${id}`);
    
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu.id !== `dropdown-${id}`) {
            menu.classList.remove('show');
        }
    });
    
    if (dropdown) dropdown.classList.toggle('show');
}

// View detail
function viewDetail(id) {
    selectedRecord = historyData.find(item => item.id === id);
    if (!selectedRecord) return;
    
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
    });
    
    const modalDate = document.getElementById('modal-date');
    const modalDisease = document.getElementById('modal-disease');
    const modalConfidence = document.getElementById('modal-confidence');
    const modalSolution = document.getElementById('modal-solution');
    const symptomsContainer = document.getElementById('modal-symptoms');
    const detailModal = document.getElementById('detail-modal');

    if (modalDate) modalDate.textContent = selectedRecord.date + ' • ' + selectedRecord.time;
    if (modalDisease) modalDisease.textContent = selectedRecord.disease;
    if (modalConfidence) modalConfidence.textContent = selectedRecord.confidence + '%';
    if (modalSolution) modalSolution.textContent = selectedRecord.solution;
    
    if (symptomsContainer) {
        symptomsContainer.innerHTML = selectedRecord.symptoms.map(symptom => `
            <div class="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                <i class="fas fa-check-circle text-green-600"></i>
                <span>${symptom}</span>
            </div>
        `).join('');
    }
    
    if (detailModal) detailModal.classList.remove('hidden');
}

// Close modal
function closeModal() {
    const detailModal = document.getElementById('detail-modal');
    if (detailModal) detailModal.classList.add('hidden');
    selectedRecord = null;
}

// Delete single record
function deleteRecord(id) {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
    });
    
    if (!confirm('Apakah Anda yakin ingin menghapus riwayat ini?')) return;
    
    historyData = historyData.filter(item => item.id !== id);
    localStorage.setItem('diagnosisHistory', JSON.stringify(historyData));
    
    // Adjust current page if needed
    const totalPages = getTotalPages();
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    }
    if (historyData.length === 0) {
        currentPage = 1;
    }
    
    renderHistory();
}

function initRiwayatPage() {
    // Pagination button handlers
    const firstPageBtn = document.getElementById('first-page-btn');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const lastPageBtn = document.getElementById('last-page-btn');

    if (firstPageBtn) firstPageBtn.addEventListener('click', () => goToPage(1));
    if (prevPageBtn) prevPageBtn.addEventListener('click', () => goToPage(currentPage - 1));
    if (nextPageBtn) nextPageBtn.addEventListener('click', () => goToPage(currentPage + 1));
    if (lastPageBtn) lastPageBtn.addEventListener('click', () => goToPage(getTotalPages()));

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown-toggle') && !e.target.closest('button[onclick^="toggleDropdown"]')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });

    // Close modal buttons
    const closeModalBtn = document.getElementById('close-modal-btn');
    const closeModalBottomBtn = document.getElementById('close-modal-bottom-btn');
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (closeModalBottomBtn) closeModalBottomBtn.addEventListener('click', closeModal);

    // Print PDF from modal
    const printPdfModalBtn = document.getElementById('print-pdf-modal-btn');
    if (printPdfModalBtn) {
        printPdfModalBtn.addEventListener('click', function() {
            if (!selectedRecord) return;
            
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.setFontSize(18);
            doc.text('Hasil Diagnosa Penyakit Padi', 105, 20, { align: 'center' });
            
            doc.setFontSize(12);
            doc.text('Tanggal: ' + selectedRecord.date, 20, 40);
            doc.text('Waktu: ' + selectedRecord.time, 20, 50);
            
            doc.setFontSize(14);
            doc.text('Penyakit:', 20, 70);
            doc.setFontSize(12);
            doc.text(selectedRecord.disease, 20, 80);
            
            doc.setFontSize(14);
            doc.text('Deskripsi:', 20, 95);
            doc.setFontSize(11);
            const descLines = doc.splitTextToSize(selectedRecord.description, 170);
            doc.text(descLines, 20, 105);
            
            doc.setFontSize(14);
            doc.text('Solusi Penanganan:', 20, 125);
            doc.setFontSize(11);
            const solLines = doc.splitTextToSize(selectedRecord.solution, 170);
            doc.text(solLines, 20, 135);
            
            doc.setFontSize(14);
            doc.text('Tingkat Keyakinan: ' + selectedRecord.confidence + '%', 20, 155);
            
            doc.setFontSize(14);
            doc.text('Gejala yang Terdeteksi:', 20, 175);
            doc.setFontSize(11);
            let yPos = 185;
            selectedRecord.symptoms.forEach((symptom, index) => {
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.text((index + 1) + '. ' + symptom, 25, yPos);
                yPos += 7;
            });
            
            doc.setFontSize(10);
            doc.text('Pakar Padi - Sistem Pakar Diagnosis Penyakit Tanaman Padi', 105, 280, { align: 'center' });
            
            doc.save('hasil-diagnosa-' + selectedRecord.id + '.pdf');
            
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> <span>PDF Terunduh!</span>';
            this.classList.remove('bg-green-600');
            this.classList.add('bg-green-700');
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.classList.remove('bg-green-700');
                this.classList.add('bg-green-600');
            }, 2000);
        });
    }

    // Delete all records
    const deleteAllBtn = document.getElementById('delete-all-btn');
    if (deleteAllBtn) {
        deleteAllBtn.addEventListener('click', function() {
            if (historyData.length === 0) {
                alert('Tidak ada riwayat untuk dihapus.');
                return;
            }
            const deleteConfirmModal = document.getElementById('delete-confirm-modal');
            if (deleteConfirmModal) deleteConfirmModal.classList.remove('hidden');
        });
    }

    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            historyData = [];
            localStorage.setItem('diagnosisHistory', JSON.stringify(historyData));
            currentPage = 1;
            renderHistory();
            const deleteConfirmModal = document.getElementById('delete-confirm-modal');
            if (deleteConfirmModal) deleteConfirmModal.classList.add('hidden');
            alert('Semua riwayat diagnosa telah dihapus.');
        });
    }

    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', function() {
            const deleteConfirmModal = document.getElementById('delete-confirm-modal');
            if (deleteConfirmModal) deleteConfirmModal.classList.add('hidden');
        });
    }

    // Close modals when clicking outside
    const detailModal = document.getElementById('detail-modal');
    if (detailModal) {
        detailModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }

    const deleteConfirmModal = document.getElementById('delete-confirm-modal');
    if (deleteConfirmModal) {
        deleteConfirmModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
            }
        });
    }

    // Initialize
    loadHistoryData();
    renderHistory();
}

// ============================================
// FUNGSI UNTUK DIAGNOSA.HTML
// ============================================

// Data Gejala
const gejalaData = [
    { id: 1, nama: "Daun berwarna kuning pucat (klorosis)", kategori: "daun", icon: "leaf" },
    { id: 2, nama: "Bercak cokelat memanjang di daun", kategori: "daun", icon: "leaf" },
    { id: 3, nama: "Daun terdapat bercak bulat kehitaman", kategori: "daun", icon: "leaf" },
    { id: 4, nama: "Daun bagian atas kering seperti terbakar", kategori: "daun", icon: "leaf" },
    { id: 5, nama: "Anakan mati mendadak", kategori: "pertumbuhan", icon: "seedling" },
    { id: 6, nama: "Pertumbuhan lambat dan berwarna keunguan", kategori: "pertumbuhan", icon: "seedling" },
    { id: 7, nama: "Daun menggulung dan kaku", kategori: "daun", icon: "leaf" },
    { id: 8, nama: "Pelepah membusuk dan berwarna kehitaman", kategori: "batang", icon: "tree" },
    { id: 9, nama: "Bagian bawah batang busuk basah", kategori: "batang", icon: "tree" },
    { id: 10, nama: "Daun dan pelepah layu siang, pulih malam", kategori: "daun", icon: "leaf" },
    { id: 11, nama: "Terdapat bercak putih kecil di permukaan batang", kategori: "batang", icon: "tree" },
    { id: 12, nama: "Daun terdapat bercak konsentris berwarna cokelat terang", kategori: "daun", icon: "leaf" },
    { id: 13, nama: "Tanaman tumbuh kerdil, berdaun sempit, pucat", kategori: "pertumbuhan", icon: "seedling" },
    { id: 14, nama: "Daun tampak belang dengan garis kuning terang", kategori: "daun", icon: "leaf" },
    { id: 15, nama: "Daun melipat dan mengeluarkan lendir", kategori: "daun", icon: "leaf" },
    { id: 16, nama: "Stomata berbentuk belah ketupat berwarna abu-abu", kategori: "bulir", icon: "seedling" },
    { id: 17, nama: "Batang atau akar membusuk", kategori: "akar", icon: "tree" }
];

// State Management for Diagnosa
let currentStep = 1;
let currentFilter = 'semua';
let currentDiagnosaPage = 1;
let selectedGejala = [];
let certaintyAnswers = {};
let diagnosisResult = null;
const itemsPerPageDiagnosa = 12;

// Initialize Diagnosa Page
function initDiagnosaPage() {
    initializeFilterTabs();
    renderGejala();
    setupPaginationDiagnosa();
    setupEventListenersDiagnosa();
}

// Filter Tabs
function initializeFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            currentDiagnosaPage = 1;
            renderGejala();
            setupPaginationDiagnosa();
        });
    });
}

// Render Gejala
function renderGejala() {
    const filteredData = currentFilter === 'semua' 
        ? gejalaData 
        : gejalaData.filter(g => g.kategori === currentFilter);

    const startIndex = (currentDiagnosaPage - 1) * itemsPerPageDiagnosa;
    const endIndex = startIndex + itemsPerPageDiagnosa;
    const pageData = filteredData.slice(startIndex, endIndex);

    const grid = document.getElementById('gejalaGrid');
    if (!grid) return;
    
    grid.innerHTML = '';

    pageData.forEach(gejala => {
        const isSelected = selectedGejala.includes(gejala.id);
        const card = `
            <div class="gejala-card ${isSelected ? 'selected' : ''}" data-id="${gejala.id}">
                <div class="gejala-checkbox">
                    <i class="fas fa-check"></i>
                </div>
                <div class="gejala-icon">
                    <i class="fas fa-${gejala.icon}"></i>
                </div>
                <h4 class="font-semibold text-gray-800 text-sm mb-1">${gejala.nama}</h4>
                <p class="text-xs text-gray-500 capitalize">${gejala.kategori}</p>
            </div>
        `;
        grid.innerHTML += card;
    });

    // Add click handlers
    document.querySelectorAll('.gejala-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            toggleGejala(id);
        });
    });

    updateCountsDiagnosa(filteredData.length);
}

// Toggle Gejala Selection
function toggleGejala(id) {
    const index = selectedGejala.indexOf(id);
    if (index > -1) {
        selectedGejala.splice(index, 1);
    } else {
        selectedGejala.push(id);
    }
    renderGejala();
    updateNextButton();
}

// Update Counts
function updateCountsDiagnosa(totalFiltered) {
    const showingCount = document.getElementById('showingCount');
    const totalCount = document.getElementById('totalCount');
    const selectedCount = document.getElementById('selectedCount');

    if (showingCount) showingCount.textContent = Math.min(itemsPerPageDiagnosa, totalFiltered - (currentDiagnosaPage - 1) * itemsPerPageDiagnosa);
    if (totalCount) totalCount.textContent = totalFiltered;
    if (selectedCount) selectedCount.textContent = selectedGejala.length;
}

// Update Next Button
function updateNextButton() {
    const btn = document.getElementById('nextToKeyakinan');
    if (btn) btn.disabled = selectedGejala.length === 0;
}

// Pagination
function setupPaginationDiagnosa() {
    const filteredData = currentFilter === 'semua' 
        ? gejalaData 
        : gejalaData.filter(g => g.kategori === currentFilter);
    
    const totalPages = Math.ceil(filteredData.length / itemsPerPageDiagnosa);
    const paginationNumbers = document.getElementById('paginationNumbers');
    if (!paginationNumbers) return;
    
    paginationNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = `pagination-btn ${i === currentDiagnosaPage ? 'active' : ''}`;
        btn.textContent = i;
        btn.addEventListener('click', () => {
            currentDiagnosaPage = i;
            renderGejala();
            setupPaginationDiagnosa();
        });
        paginationNumbers.appendChild(btn);
    }

    // Prev/Next buttons
    const prevPage = document.getElementById('prevPage');
    const nextPage = document.getElementById('nextPage');
    if (prevPage) prevPage.disabled = currentDiagnosaPage === 1;
    if (nextPage) nextPage.disabled = currentDiagnosaPage === totalPages;
}

// Event Listeners
function setupEventListenersDiagnosa() {
    // Prev Page
    const prevPage = document.getElementById('prevPage');
    if (prevPage) {
        prevPage.addEventListener('click', () => {
            if (currentDiagnosaPage > 1) {
                currentDiagnosaPage--;
                renderGejala();
                setupPaginationDiagnosa();
            }
        });
    }

    // Next Page
    const nextPage = document.getElementById('nextPage');
    if (nextPage) {
        nextPage.addEventListener('click', () => {
            const filteredData = currentFilter === 'semua' 
                ? gejalaData 
                : gejalaData.filter(g => g.kategori === currentFilter);
            const totalPages = Math.ceil(filteredData.length / itemsPerPageDiagnosa);
            if (currentDiagnosaPage < totalPages) {
                currentDiagnosaPage++;
                renderGejala();
                setupPaginationDiagnosa();
            }
        });
    }

    // Next to Keyakinan
    const nextToKeyakinan = document.getElementById('nextToKeyakinan');
    if (nextToKeyakinan) {
        nextToKeyakinan.addEventListener('click', () => {
            if (selectedGejala.length > 0) {
                goToStep(2);
                renderCertaintyQuestions();
            }
        });
    }

    // Back to Gejala
    const backToGejala = document.getElementById('backToGejala');
    if (backToGejala) {
        backToGejala.addEventListener('click', () => {
            goToStep(1);
        });
    }

    // Process Diagnosa
    const processDiagnosa = document.getElementById('processDiagnosa');
    if (processDiagnosa) {
        processDiagnosa.addEventListener('click', () => {
            if (validateCertaintyAnswers()) {
                showLoadingModal();
            } else {
                alert('Mohon jawab semua pertanyaan tingkat keyakinan terlebih dahulu!');
            }
        });
    }

    // Result Actions
    const saveToHistory = document.getElementById('saveToHistory');
    if (saveToHistory) saveToHistory.addEventListener('click', saveToHistoryWithAnimation);
    
    const printPDF = document.getElementById('printPDF');
    if (printPDF) printPDF.addEventListener('click', printPDFWithAnimation);
    
    const newDiagnosa = document.getElementById('newDiagnosa');
    if (newDiagnosa) newDiagnosa.addEventListener('click', resetDiagnosa);
}

// Go to Step
function goToStep(step) {
    currentStep = step;

    // Hide all steps
    const step1Content = document.getElementById('step1Content');
    const step2Content = document.getElementById('step2Content');
    const step3Content = document.getElementById('step3Content');

    if (step1Content) step1Content.classList.add('hidden');
    if (step2Content) step2Content.classList.add('hidden');
    if (step3Content) step3Content.classList.add('hidden');

    // Show current step
    const currentStepContent = document.getElementById(`step${step}Content`);
    if (currentStepContent) currentStepContent.classList.remove('hidden');

    // Update step indicators
    updateStepIndicators();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update Step Indicators
function updateStepIndicators() {
    for (let i = 1; i <= 3; i++) {
        const circle = document.getElementById(`step${i}Circle`);
        const label = document.getElementById(`step${i}Label`);
        const line = document.getElementById(`line${i}`);

        if (!circle || !label) continue;

        if (i < currentStep) {
            circle.classList.add('completed');
            circle.classList.remove('active');
            label.classList.remove('text-gray-500');
            label.classList.add('text-green-700');
            if (line) line.classList.add('active');
        } else if (i === currentStep) {
            circle.classList.add('active');
            circle.classList.remove('completed');
            label.classList.remove('text-gray-500');
            label.classList.add('text-green-700');
        } else {
            circle.classList.remove('active', 'completed');
            label.classList.remove('text-green-700');
            label.classList.add('text-gray-500');
            if (line) line.classList.remove('active');
        }
    }
}

// Render Certainty Questions
function renderCertaintyQuestions() {
    const container = document.getElementById('certaintyQuestions');
    if (!container) return;
    
    container.innerHTML = '';

    const certaintyOptions = [
        { value: 1.0, label: 'Pasti', desc: 'Saya sangat yakin 100% gejala ini ada pada tanaman' },
        { value: 0.8, label: 'Hampir Pasti', desc: 'Saya yakin sekitar 80-90% gejala ini terlihat jelas' },
        { value: 0.6, label: 'Kemungkinan Besar', desc: 'Saya cukup yakin sekitar 60-70% gejala ini ada' },
        { value: 0.4, label: 'Mungkin', desc: 'Saya kurang yakin sekitar 40-50% mungkin ada gejala ini' },
        { value: 0.2, label: 'Tidak Tahu', desc: 'Saya tidak yakin atau ragu-ragu dengan gejala ini' },
        { value: 0.0, label: 'Tidak Ada', desc: 'Saya yakin gejala ini tidak ada pada tanaman' }
    ];

    selectedGejala.forEach(gejalaId => {
        const gejala = gejalaData.find(g => g.id === gejalaId);
        if (!gejala) return;

        const questionDiv = document.createElement('div');
        questionDiv.className = 'border-b pb-6';
        questionDiv.innerHTML = `
            <h3 class="font-semibold text-gray-800 mb-4">Seberapa yakin Anda dengan gejala "${gejala.nama}"?</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-gejala-id="${gejalaId}">
                ${certaintyOptions.map(option => `
                    <div class="certainty-card" data-value="${option.value}">
                        <div class="flex items-start">
                            <span class="certainty-radio"></span>
                            <div>
                                <h4 class="font-semibold text-gray-800">${option.label}</h4>
                                <p class="text-sm text-gray-600 mt-1">${option.desc}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(questionDiv);
    });

    // Add click handlers for certainty cards
    document.querySelectorAll('.certainty-card').forEach(card => {
        card.addEventListener('click', function() {
            const gejalaId = parseInt(this.closest('[data-gejala-id]').dataset.gejalaId);
            const value = parseFloat(this.dataset.value);

            // Remove selected from siblings
            this.parentElement.querySelectorAll('.certainty-card').forEach(c => {
                c.classList.remove('selected');
            });

            // Add selected to this card
            this.classList.add('selected');

            // Store answer
            certaintyAnswers[gejalaId] = value;

            // Update process button
            updateProcessButton();
        });
    });
}

// Validate Certainty Answers
function validateCertaintyAnswers() {
    return selectedGejala.every(id => certaintyAnswers.hasOwnProperty(id));
}

// Update Process Button
function updateProcessButton() {
    const btn = document.getElementById('processDiagnosa');
    if (btn) btn.disabled = !validateCertaintyAnswers();
}

// Show Loading Modal
function showLoadingModal() {
    const modal = document.createElement('div');
    modal.className = 'loading-modal';
    modal.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Memproses Diagnosa</h3>
            <p class="text-gray-600 mb-4">Menganalisis gejala yang Anda pilih...</p>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <p class="text-sm text-gray-500 mt-2" id="loadingStep">Mengumpulkan data gejala...</p>
        </div>
    `;
    document.body.appendChild(modal);

    // Simulate processing steps
    const steps = [
        'Mengumpulkan data gejala...',
        'Menerapkan Forward Chaining...',
        'Menghitung Certainty Factor...',
        'Menganalisis hasil diagnosa...'
    ];

    let stepIndex = 0;
    const stepInterval = setInterval(() => {
        stepIndex++;
        if (stepIndex < steps.length) {
            const loadingStep = document.getElementById('loadingStep');
            if (loadingStep) loadingStep.textContent = steps[stepIndex];
        }
    }, 750);

    setTimeout(() => {
        clearInterval(stepInterval);
        document.body.removeChild(modal);
        calculateResult();
        goToStep(3);
    }, 3000);
}

// Calculate Result
function calculateResult() {
    // Simple calculation: average of certainty values
    const values = Object.values(certaintyAnswers);
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    const percentage = Math.round(average * 100);

    // Disease name based on symptoms (simplified logic)
    let diseaseName = 'Hawar Daun Bakteri (BLB)';
    let description = 'Penyakit yang disebabkan oleh bakteri Xanthomonas oryzae yang menyerang daun tanaman padi.';
    let solution = 'Untuk mengatasi Hawar Daun Bakteri (BLB), disarankan untuk melakukan penyemprotan fungisida sesuai dosis, perbaiki drainase sawah, dan pemupukan yang seimbang. Konsultasikan dengan penyuluh pertanian setempat untuk penanganan lebih lanjut.';

    if (selectedGejala.includes(5) || selectedGejala.includes(6)) {
        diseaseName = 'Penyakit Tungro';
        description = 'Penyakit virus yang disebarkan oleh wereng hijau, menyebabkan pertumbuhan tanaman terhambat.';
        solution = 'Penanganan Penyakit Tungro dilakukan dengan mengendalikan vektor wereng hijau menggunakan insektisida, gunakan varietas tahan tungro, dan lakukan sanitasi lahan dengan membersihkan gulma dan sisa tanaman.';
    } else if (selectedGejala.includes(9) || selectedGejala.includes(17)) {
        diseaseName = 'Busuk Batang';
        description = 'Penyakit yang menyerang batang tanaman padi menyebabkan pembusukan.';
        solution = 'Untuk mengatasi Busuk Batang, perbaiki sistem drainase untuk menghindari genangan air, gunakan pupuk berimbang, dan aplikasikan fungisida sistemik. Lakukan rotasi tanaman untuk memutus siklus penyakit.';
    }

    // Store result
    diagnosisResult = {
        id: Date.now(),
        date: new Date().toLocaleDateString('id-ID'),
        time: new Date().toLocaleTimeString('id-ID'),
        disease: diseaseName,
        description: description,
        solution: solution,
        confidence: percentage,
        symptoms: selectedGejala.map(id => gejalaData.find(g => g.id === id).nama)
    };

    // Update result display
    const resultPercentage = document.getElementById('resultPercentage');
    const diseaseNameEl = document.getElementById('diseaseName');
    const solutionText = document.getElementById('solutionText');

    if (resultPercentage) resultPercentage.textContent = percentage + '%';
    if (diseaseNameEl) diseaseNameEl.textContent = diseaseName;
    if (solutionText) solutionText.textContent = solution;

    // Render observed symptoms
    renderObservedSymptoms();
}

// Render Observed Symptoms
function renderObservedSymptoms() {
    const container = document.getElementById('observedSymptoms');
    if (!container) return;
    
    container.innerHTML = '';

    selectedGejala.forEach(gejalaId => {
        const gejala = gejalaData.find(g => g.id === gejalaId);
        if (!gejala) return;

        const symptomDiv = document.createElement('div');
        symptomDiv.className = 'flex items-start space-x-2';
        symptomDiv.innerHTML = `
            <i class="fas fa-check-circle text-green-700 mt-1"></i>
            <span class="text-gray-700">${gejala.nama}</span>
        `;
        container.appendChild(symptomDiv);
    });
}

// Save to History with Animation
function saveToHistoryWithAnimation() {
    if (!diagnosisResult) return;

    // Get existing history
    let history = JSON.parse(localStorage.getItem('diagnosisHistory') || '[]');
    
    // Add new result
    history.unshift(diagnosisResult);
    
    // Save to localStorage
    localStorage.setItem('diagnosisHistory', JSON.stringify(history));

    // Show success modal
    showSuccessModal('Tersimpan!', 'Hasil diagnosa berhasil disimpan ke riwayat');
}

// Print PDF with Animation
function printPDFWithAnimation() {
    if (!diagnosisResult) return;

    // Show loading overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="loading-spinner" style="margin: 0 auto 1rem;"></div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">Membuat PDF</h3>
        <p class="text-gray-600">Mohon tunggu sebentar...</p>
    `;
    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    setTimeout(() => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Add content
        doc.setFontSize(18);
        doc.text('Hasil Diagnosa Penyakit Padi', 105, 20, { align: 'center' });
        
        doc.setFontSize(12);
        doc.text('Tanggal: ' + diagnosisResult.date, 20, 40);
        doc.text('Waktu: ' + diagnosisResult.time, 20, 50);
        
        doc.setFontSize(14);
        doc.text('Penyakit:', 20, 70);
        doc.setFontSize(12);
        doc.text(diagnosisResult.disease, 20, 80);
        
        doc.setFontSize(14);
        doc.text('Deskripsi:', 20, 95);
        doc.setFontSize(11);
        const descLines = doc.splitTextToSize(diagnosisResult.description, 170);
        doc.text(descLines, 20, 105);
        
        doc.setFontSize(14);
        doc.text('Solusi Penanganan:', 20, 125);
        doc.setFontSize(11);
        const solLines = doc.splitTextToSize(diagnosisResult.solution, 170);
        doc.text(solLines, 20, 135);
        
        doc.setFontSize(14);
        doc.text('Tingkat Keyakinan: ' + diagnosisResult.confidence + '%', 20, 160);
        
        doc.setFontSize(14);
        doc.text('Gejala yang Dipilih:', 20, 180);
        doc.setFontSize(11);
        let yPos = 190;
        diagnosisResult.symptoms.forEach((symptom, index) => {
            doc.text((index + 1) + '. ' + symptom, 25, yPos);
            yPos += 7;
        });
        
        // Add footer
        doc.setFontSize(10);
        doc.text('Pakar Padi - Sistem Pakar Diagnosis Penyakit Tanaman Padi', 105, 280, { align: 'center' });
        
        // Save PDF
        doc.save('hasil-diagnosa-' + diagnosisResult.id + '.pdf');

        // Remove loading and show success
        document.body.removeChild(overlay);
        document.body.removeChild(modal);
        
        showSuccessModal('PDF Berhasil!', 'File PDF telah berhasil diunduh');
    }, 1500);
}

// Show Success Modal
function showSuccessModal(title, message) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="success-icon">
            <div class="success-checkmark"></div>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">${title}</h3>
        <p class="text-gray-600">${message}</p>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    setTimeout(() => {
        document.body.removeChild(overlay);
        document.body.removeChild(modal);
    }, 2000);
}

// Reset Diagnosa
function resetDiagnosa() {
    selectedGejala = [];
    certaintyAnswers = {};
    diagnosisResult = null;
    currentStep = 1;
    currentFilter = 'semua';
    currentDiagnosaPage = 1;
    
    // Reset filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => tab.classList.remove('active'));
    const semuaTab = document.querySelector('.filter-tab[data-filter="semua"]');
    if (semuaTab) semuaTab.classList.add('active');
    
    goToStep(1);
    renderGejala();
    setupPaginationDiagnosa();
    updateNextButton();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// INITIALIZATION - Detect page and run appropriate init
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Detect current page by checking unique elements
    if (document.getElementById('contact-form')) {
        initKontakPage();
    } else if (document.getElementById('login-form')) {
        initLoginPage();
    } else if (document.getElementById('register-form')) {
        initRegisterPage();
    } else if (document.getElementById('history-container')) {
        initRiwayatPage();
    } else if (document.getElementById('gejalaGrid')) {
        initDiagnosaPage();
    }
});