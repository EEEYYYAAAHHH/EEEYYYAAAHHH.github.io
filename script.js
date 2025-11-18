// script.js
document.addEventListener("DOMContentLoaded", () => {
	const gallery = document.getElementById("gallery");
	const category = document.getElementById("category");
	const form = document.querySelector("form");
	let data = [];

	// Load the JSON and show all portraits
	fetch("gallery.json")
		.then(res => res.json())
		.then(json => {
			data = json;
			showImages(data);
		})
		.catch(() => gallery.textContent = "Error loading images.");

	// Display images in the gallery
	function showImages(list) {
		gallery.innerHTML = "";
		list.forEach(item => {
			const img = document.createElement("img");
			img.src = item.portrait;
			//img.alt = item.name;
			img.addEventListener("click", () => zoomImages(img.src));
			gallery.appendChild(img);
		});
	}
	//Now I just need something zoom the pictures in
	function zoomImages(src) {
		const overlay = document.createElement("div");
		overlay.style.position = "fixed";
		overlay.style.top = "0";
		overlay.style.left = "0";
		overlay.style.width = "100vw";
		overlay.style.height = "100vh";
		overlay.style.backgroundColor = "rgba(0,0,0,0.8)";
		overlay.style.display = "flex";
		overlay.style.alignItems = "center";
		overlay.style.justifyContent = "center";
		overlay.style.zIndex = "1000";

		const zoomed = document.createElement("img");
		zoomed.src = src;
		//zoomed.alt = alt;
		zoomed.style.maxWidth = "90%";
		zoomed.style.maxHeight = "90%";
		
		overlay.appendChild(zoomed); 
		document.body.appendChild(overlay); 
		
		overlay.addEventListener("click", () => overlay.remove()); 
	}
	
	// Filter when user picks a category or submits form
	function filterImages() {
		const selected = category.options[category.selectedIndex].text;
		if (selected === "All") showImages(data);
		else showImages(data.filter(p => p.category === selected));
	}

	category.addEventListener("change", filterImages);
	form.addEventListener("submit", e => { e.preventDefault(); filterImages(); });
});


