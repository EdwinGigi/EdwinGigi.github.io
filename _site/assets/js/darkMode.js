document.addEventListener('DOMContentLoaded', function() {
	const darkModeToggle = document.getElementById('darkModeToggle');
	const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
	const icon = darkModeToggle.querySelector('i');
	
	// Check for saved theme preference or use system preference
	const currentTheme = localStorage.getItem('theme') || 
						(prefersDarkScheme.matches ? 'dark' : 'light');
	
	// Apply the saved theme
	document.documentElement.setAttribute('data-theme', currentTheme);
	updateIcon(currentTheme);
	
	// Toggle theme on button click
	darkModeToggle.addEventListener('click', function() {
		const currentTheme = document.documentElement.getAttribute('data-theme');
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		
		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
		updateIcon(newTheme);
	});
	
	// Update icon based on current theme
	function updateIcon(theme) {
		if (theme === 'dark') {
			icon.classList.remove('fa-moon');
			icon.classList.add('fa-sun');
		} else {
			icon.classList.remove('fa-sun');
			icon.classList.add('fa-moon');
		}
	}
	
	// Listen for system theme changes
	prefersDarkScheme.addEventListener('change', function(e) {
		if (!localStorage.getItem('theme')) {
			const newTheme = e.matches ? 'dark' : 'light';
			document.documentElement.setAttribute('data-theme', newTheme);
			updateIcon(newTheme);
		}
	});
});
