/*



	" Reimplement the wheel to either learn, or make it better. "

    http://www.haydex.com/
    https://www.youtube.com/watch?v=QOlTGA3RE8I
    
    Product Name: Btracker
	Description: Tracking Blog's data.
	Beneficiary: COSMOS
	
	Copyright © 1988 - 2020 HAYDEX, All Rights Reserved.
	
	
	
*/



document.addEventListener("DOMContentLoaded", function() {

    // General

    class General {

        constructor() {

            this.body = document.querySelector("body");
            this.tree = document.querySelector("ul#narrativeTree");
            this.keywords = document.querySelectorAll("ul#narrativeTree li.level div.keyword");
            this.radioButtons = document.querySelectorAll("ul#narrativeTree li.level div#keywordWrapper button#radioButton");
            this.ungroupButtons = document.querySelectorAll("ul#narrativeTree li.level div#keywordWrapper button#ungroupButton");
            this.narrativesList = document.querySelectorAll("ul#narrativeTree li.level ul.narratives");
            this.narratives = document.querySelectorAll("ul#narrativeTree li.level ul.narratives li.narrative");
            this.posts = document.querySelectorAll("ul#narrativeTree li.level ul.narratives li.narrative div.posts div.post");
            this.moreButton = document.querySelectorAll("ul#narrativeTree li.level ul.narratives li.narrative.more");
            this.moreInfoModal = document.querySelector("section#moreInfoModal");
            this.moreInfoModalShadow = document.querySelector("section#moreInfoModal div#shadow");
            this.moreInfoModalContent = document.querySelector("section#moreInfoModal div#messageContent");
            this.moreInfoCloseButton = document.querySelector("section#moreInfoModal div#messageBox button#closeButton");
            this.notifications = document.querySelector("section#notifications");
            this.notificationsMergeButton = document.querySelector("section#notifications div#mergeMessage button#mergeButton");
            this.notificationsCounter = document.querySelector("section#notifications span#counter");
            this.narrativeEditButton = "editButton";
            this.narrativeConfirmButton = "confirmButton";
            this.narrativeCancelButton = "cancelButton";

            this.uncollapseClass = "uncollapse";
            this.openClass = "open";
            this.narrativeText = "narrativeText";
            this.displayedClass = "displayed";
            this.hiddenClass = "hidden";
            this.lastClass = "last";
            this.editingClass = "editing";
            this.selectedClass = "selected";
            this.closeButton = "closeButton";
            this.previousContent = "";
            this.enabledClass = "enabled";
            this.groupClass = "group";
            this.selectionCounter = 0;

            this.freezeDocumentScrollingClass = "freeze";

            this.initialize();

        }

        initialize() {

            for (let i = 0; i < this.ungroupButtons.length; i++) {

                this.ungroupButtons[i].addEventListener("click", this.ungroupButtonClickListener.bind(this));

            }

            for (let i = 0; i < this.moreButton.length; i++) {

                this.moreButton[i].addEventListener("click", this.morebuttonClickListener.bind(this));

            }

            for (let i = 0; i < this.keywords.length; i++) {

                this.keywords[i].addEventListener("click", this.keywordsClickListener.bind(this));

            }

            for (let i = 0; i < this.radioButtons.length; i++) {

                this.radioButtons[i].addEventListener("click", this.radioButtonsClickListener.bind(this));

            }


            for (let i = 0; i < this.narratives.length; i++) {

                this.narratives[i].addEventListener("click", this.narrativesClickListener.bind(this));

            }

            for (let i = 0; i < this.posts.length; i++) {

                this.posts[i].addEventListener("click", this.postsClickListener.bind(this));

            }

            this.moreInfoCloseButton.addEventListener("click", this.moreInfoCloseButtonClickListener.bind(this));
            this.moreInfoModalShadow.addEventListener("click", this.moreInfoModalShadowClickListener.bind(this));
            this.notifications.addEventListener("click", this.notificationsClickListener.bind(this));
            this.notificationsMergeButton.addEventListener("click", this.notificationsMergeButtonClickListener.bind(this));
            document.addEventListener("keydown", this.escapeKeyListener.bind(this));

        }

        notificationsMergeButtonClickListener(event) {

            let keywords = document.querySelectorAll("ul#narrativeTree li.level div#keywordWrapper.selected");

            let text = "";
            for (let i = 0; i < keywords.length; i++) {

                text = text + keywords[i].querySelector("p").textContent + ", ";

            }

            text = text.slice(0, -2);

            keywords[0].querySelector("p").textContent = text;
            keywords[0].classList.add(this.groupClass);
            keywords[0].parentNode.classList.remove(this.uncollapseClass);

            for (let i = 1; i < keywords.length; i++) {

                keywords[i].parentNode.remove();

            }

            this.selectionCounter = 1;
            this.notificationsCounter.textContent = this.selectionCounter;
            this.notificationsMergeButton.classList.remove(this.enabledClass);
            this.notificationsMergeButton.disabled = true;

            keywords[0].scrollIntoView({
                block: "start",
                behavior: "smooth",
              });


        }

        ungroupButtonClickListener(event) {

            let keywords = event.target.previousElementSibling.querySelector("p").textContent.split(', ');
            
            event.target.previousElementSibling.querySelector("p").textContent = keywords[0];
            event.target.parentNode.parentNode.classList.remove(this.uncollapseClass);
            event.target.parentNode.classList.remove(this.groupClass);
            let node = event.target.parentNode.parentNode.querySelectorAll("ul.narratives li.narrative");
            for (let i = 0; i < node.length; i++) {

                node[i].classList.remove(this.openClass);

            }

            for (let i=keywords.length-1; i > 0; i--) {

                let node = event.target.parentNode.parentNode.cloneNode(true);
                
                node.querySelector("p").textContent = keywords[i];
                
                node.querySelector("button#ungroupButton").addEventListener("click", this.ungroupButtonClickListener.bind(this));
                event.target.parentNode.parentNode.after(node);
                event.target.parentNode.parentNode.nextSibling.querySelector("div.keyword").addEventListener("click", this.keywordsClickListener.bind(this));
                event.target.parentNode.parentNode.nextSibling.querySelector("div#keywordWrapper button#radioButton").addEventListener("click", this.radioButtonsClickListener.bind(this));
                let narratives = event.target.parentNode.parentNode.nextSibling.querySelectorAll("ul.narratives li.narrative");
                for (let i = 0; i < narratives.length; i++) {

                    narratives[i].addEventListener("click", this.narrativesClickListener.bind(this));
    
                }
                let posts = event.target.parentNode.parentNode.nextSibling.querySelectorAll("ul.narratives li.narrative div.posts div.post");
                for (let i = 0; i < posts.length; i++) {

                    posts[i].addEventListener("click", this.postsClickListener.bind(this));
    
                }
    
                if (event.target.parentNode.classList.contains(this.selectedClass)) this.selectionCounter++;
                

            }

            this.keywords = document.querySelectorAll("ul#narrativeTree li.level div.keyword");
            this.notificationsCounter.textContent = this.selectionCounter;

            if (this.selectionCounter > 1) {
                
                this.notificationsMergeButton.classList.add(this.enabledClass);
                this.notificationsMergeButton.disabled = false;

            } else {

                this.notificationsMergeButton.classList.remove(this.enabledClass);
                this.notificationsMergeButton.disabled = true;

            }

        }

        notificationsClickListener(event) {

            if (event.target.id == this.closeButton) {

                this.notificationsCloseClickListener();

            }

        }

        notificationsCloseClickListener() {

            this.selectionCounter = 0;

            this.notifications.classList.remove(this.displayedClass);

            for (let i=0; i< this.keywords.length; i++) {

                this.keywords[i].parentNode.classList.remove(this.selectedClass);

            }

        }

        morebuttonClickListener() {

            for (let i = 0; i < this.narratives.length; i++) {

                this.narratives[i].classList.remove(this.hiddenClass);

            }

            this.moreButton[0].previousElementSibling.classList.add(this.lastClass)
            this.moreButton[0].remove();

        }

        keywordsClickListener(event) {

            event.currentTarget.parentNode.parentNode.classList.toggle(this.uncollapseClass);

        }

        radioButtonsClickListener(event) {

            if (event.currentTarget.parentNode.classList.contains(this.selectedClass)) {

                this.selectionCounter--;

            } else {

                this.selectionCounter++;

            }

            if (this.selectionCounter > 1) {
                
                this.notificationsMergeButton.classList.add(this.enabledClass);
                this.notificationsMergeButton.disabled = false;

            } else {

                this.notificationsMergeButton.classList.remove(this.enabledClass);
                this.notificationsMergeButton.disabled = true;

            }

            if (this.selectionCounter < 1) {

                this.notificationsCloseClickListener();

            } else {

                
                event.currentTarget.parentNode.classList.toggle(this.selectedClass);
                this.notifications.classList.add(this.displayedClass);
                this.notificationsCounter.textContent = this.selectionCounter;

            }
            
        }

        narrativesClickListener(event) {


            if (event.target.id == this.narrativeEditButton) {

                event.currentTarget.classList.toggle(this.editingClass);
                event.currentTarget.getElementsByClassName(this.narrativeText)[0].setAttribute("contenteditable", "true");
                event.currentTarget.getElementsByClassName(this.narrativeText)[0].focus();
                this.previousContent = event.currentTarget.getElementsByClassName(this.narrativeText)[0].textContent;

            }

            if (event.target.id == this.narrativeConfirmButton) {

                event.currentTarget.classList.toggle(this.editingClass);
                event.currentTarget.getElementsByClassName(this.narrativeText)[0].setAttribute("contenteditable", "false");

            }

            if (event.target.id == this.narrativeCancelButton) {

                event.currentTarget.classList.toggle(this.editingClass);
                event.currentTarget.getElementsByClassName(this.narrativeText)[0].setAttribute("contenteditable", "false");
                event.currentTarget.getElementsByClassName(this.narrativeText)[0].textContent = this.previousContent;

            }

            if (event.target.classList.contains(this.narrativeText) && !(event.currentTarget.classList.contains(this.editingClass))) {
                event.currentTarget.classList.toggle(this.openClass);
            }

        }

        postsClickListener() {

            this.freezeDocumentScrolling();
            this.moreInfoModal.classList.add(this.displayedClass);
            this.resetScrolling(this.moreInfoModalContent);

        }

        moreInfoCloseButtonClickListener() {

            this.moreInfoModal.classList.remove(this.displayedClass);
            this.unfreezeDocumentScrolling();

        }

        moreInfoModalShadowClickListener() {

            this.moreInfoModal.classList.remove(this.displayedClass);
            this.unfreezeDocumentScrolling();

        }

        freezeDocumentScrolling() {

            this.body.classList.add(this.freezeDocumentScrollingClass);

        }

        unfreezeDocumentScrolling() {

            this.body.classList.remove(this.freezeDocumentScrollingClass);

        }

        resetScrolling(object) {

            object.scrollTop = 0;

        }

        escapeKeyListener() {

            if (window.event.keyCode == 27) {
                if (this.moreInfoModal.classList.contains(this.displayedClass)) {

                    this.moreInfoCloseButtonClickListener();

                } else  {

                    this.notificationsCloseClickListener();

                }
            }
        }

    }

    // Initialization

    let general = new General();

});