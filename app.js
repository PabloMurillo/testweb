// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initializeApp();
});

function initializeApp() {
    initializeDayNavigation();
    initializeFilters();
    initializeSearch();
    updateActivityCounts();
}

// Day navigation functionality
function initializeDayNavigation() {
    const dayTabs = document.querySelectorAll('.day-tab');
    const dayContents = document.querySelectorAll('.day-content');

    dayTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetDay = this.getAttribute('data-day');
            
            // Remove active class from all tabs and contents
            dayTabs.forEach(t => t.classList.remove('active'));
            dayContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(`day-${targetDay}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Update activity counts after switching days
            updateActivityCounts();
        });
    });
}

// Filter functionality
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterType = this.getAttribute('data-filter');
            
            // Remove active class from all filter buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Apply filter
            applyFilters();
        });
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function() {
        applyFilters();
    });
}

// Apply both search and type filters
function applyFilters() {
    const activeFilter = document.querySelector('.filter-btn.active');
    const filterType = activeFilter ? activeFilter.getAttribute('data-filter') : 'todos';
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    // Get currently active day content
    const activeDay = document.querySelector('.day-content.active');
    if (!activeDay) return;
    
    const activities = activeDay.querySelectorAll('.activity-item');
    
    activities.forEach(activity => {
        const activityType = activity.getAttribute('data-type');
        const activityTitle = activity.querySelector('.activity-title').textContent.toLowerCase();
        const activityDescription = activity.querySelector('.activity-description').textContent.toLowerCase();
        
        // Check type filter
        const typeMatch = filterType === 'todos' || activityType === filterType;
        
        // Check search filter
        const searchMatch = !searchTerm || 
                           activityTitle.includes(searchTerm) || 
                           activityDescription.includes(searchTerm);
        
        // Show/hide activity based on both filters
        if (typeMatch && searchMatch) {
            activity.classList.remove('hidden');
        } else {
            activity.classList.add('hidden');
        }
    });
    
    updateActivityCounts();
}

// Update activity counts for filter buttons
function updateActivityCounts() {
    const activeDay = document.querySelector('.day-content.active');
    if (!activeDay) return;
    
    const activities = activeDay.querySelectorAll('.activity-item:not(.hidden)');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Count activities by type
    const counts = {
        todos: 0,
        logistica: 0,
        feria: 0,
        ocio: 0,
        comida: 0
    };
    
    activities.forEach(activity => {
        const type = activity.getAttribute('data-type');
        if (counts.hasOwnProperty(type)) {
            counts[type]++;
        }
        counts.todos++;
    });
    
    // Update count displays
    filterBtns.forEach(btn => {
        const filterType = btn.getAttribute('data-filter');
        const countElement = btn.querySelector('.count');
        
        if (countElement && counts.hasOwnProperty(filterType)) {
            countElement.textContent = counts[filterType];
        }
    });
}

// Utility function to reset all filters
function resetFilters() {
    // Reset search
    document.getElementById('searchInput').value = '';
    
    // Reset filter to "Todos"
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    const todosBtn = document.querySelector('[data-filter="todos"]');
    if (todosBtn) {
        todosBtn.classList.add('active');
    }
    
    // Show all activities
    const activities = document.querySelectorAll('.activity-item');
    activities.forEach(activity => {
        activity.classList.remove('hidden');
    });
    
    updateActivityCounts();
}

// Handle keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to reset filters
    if (e.key === 'Escape') {
        resetFilters();
    }
    
    // Number keys to switch days (1-4)
    if (e.key >= '1' && e.key <= '4') {
        const dayKeys = ['viernes', 'sabado', 'domingo', 'lunes'];
        const dayIndex = parseInt(e.key) - 1;
        
        if (dayIndex < dayKeys.length) {
            const dayTab = document.querySelector(`[data-day="${dayKeys[dayIndex]}"]`);
            if (dayTab) {
                dayTab.click();
            }
        }
    }
    
    // Ctrl/Cmd + F to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Ensure proper layout on resize
    updateActivityCounts();
});

// Smooth scrolling for better UX
function scrollToElement(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add click handlers for smooth navigation
document.addEventListener('click', function(e) {
    // Handle day tab clicks with smooth scrolling
    if (e.target.classList.contains('day-tab')) {
        setTimeout(() => {
            const activeContent = document.querySelector('.day-content.active');
            if (activeContent) {
                scrollToElement(activeContent);
            }
        }, 100);
    }
});

// Export functions for potential external use
window.TravelApp = {
    resetFilters,
    applyFilters,
    updateActivityCounts,
    scrollToElement
};

// Handle print functionality
window.addEventListener('beforeprint', function() {
    // Show all activities when printing
    const activities = document.querySelectorAll('.activity-item');
    activities.forEach(activity => {
        activity.classList.remove('hidden');
    });
    
    // Show all days when printing
    const dayContents = document.querySelectorAll('.day-content');
    dayContents.forEach(content => {
        content.classList.add('active');
    });
});

window.addEventListener('afterprint', function() {
    // Restore original state after printing
    applyFilters();
    
    // Restore single day view
    const dayContents = document.querySelectorAll('.day-content');
    const dayTabs = document.querySelectorAll('.day-tab');
    const activeTab = document.querySelector('.day-tab.active');
    
    if (activeTab) {
        const activeDay = activeTab.getAttribute('data-day');
        dayContents.forEach(content => {
            content.classList.remove('active');
        });
        
        const targetContent = document.getElementById(`day-${activeDay}`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }
});

// Initialize tooltips or additional UI enhancements
function initializeUIEnhancements() {
    // Add loading states for external links
    const mapButtons = document.querySelectorAll('.map-button');
    mapButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i data-lucide="loader-2"></i> Abriendo...';
            this.disabled = true;
            
            // Reset button after a short delay
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                lucide.createIcons();
            }, 2000);
        });
    });
}

// Call UI enhancements after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeUIEnhancements, 500);
});