(function() {
	var Sidebar = function(mId, closeBarId) {
		this.statu = 'closed';
		this.el = document.getElementById('sidebar')
		this.closeBarEl = document.getElementById('Jiahao');
		this.MEl = document.getElementById('maskl');
		var self = this;
		this.MEl.addEventListener('click', function(event) {
        	self.triggerSwitch();
		});
		this.closeBarEl.addEventListener('click', function(event) {
        	self.triggerSwitch();
		});
	};
	Sidebar.prototype.close = function(){
		console.log('close!');
		this.el.style.left = '0';
		this.el.className = "sidebar-move-left";
		this.closeBarEl.className = 'closebar-move-left';
		$(this.MEl).fadeOut();
		this.statu = 'closed';
	};
	Sidebar.prototype.open = function(){
		console.log("open!");
		this.el.style.left = '-22rem';
		this.el.className = "sidebar-move-right";
		this.closeBarEl.className = 'closebar-move-right';
		$(this.MEl).fadeIn();
		this.statu = 'opend';
	};
	Sidebar.prototype.triggerSwitch = function() {
		if(this.statu === 'closed') {
			this.open();
		}else{
			this.close();
		}
	};
	var sidebar = new Sidebar();
})()
