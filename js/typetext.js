var jq = jQuery.noConflict();

// Timeouts wrapper
var timeouts = [];
function Timeout(fn, interval) {
	var f = function () {
		timeouts.shift();
		fn();
	};
    var id = setTimeout(f, interval);
    this.fn = fn;
    this.cleared = false;
    this.clear = function () {
        this.cleared = true;
        timeouts.shift();
        clearTimeout(id);
    };
}
function push(fn, t){
	timeouts.push(new Timeout(fn, t));
}
function clearPlayNext(){
	for (var i=0; i<timeouts.length; i++) {
			if (!timeouts[i].cleared){
				timeouts[i].fn();
				timeouts[i].clear();
				break;
			}
    		
   	}
}	
function clearPlayAll(){
	while(timeouts.length > 0){
		clearPlayNext();
	}
}

// shuffle array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Typed contenct wrapper
var typers = [];
var t_count = 0;
var t_total = 10;
var t_order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var t_i = 0;

function Typers(s, img, h){
	this.s = s;
	this.img = img;
	this.h = h;
	return this;
}

function addT(s, img, h){
	typers.push(new Typers(s, img, h));
}

// set up the typer
function type(t){
	var type = document.getElementById("type");
	var div = document.createElement('div');
	div.setAttribute('class', 'T');
	div.setAttribute('id', 't' + t_count + 'T');
	jQuery('t' + t_count + 'T').fadeOut(0);
	var span = document.createElement('span');
	span.setAttribute('id', 't' + t_count);
	if(type){
		if (t.h)
			div.innerHTML+=t.h;
		if (t.img)
			div.innerHTML+=t.img;
		if (t.s){
			div.appendChild(span);
			str = [];
			str.push(t.s);
			var options = {
			strings: str,
			typeSpeed: 0,
			startDelay: 1000,
			backSpeed: 100,
			backDelay: 0,
			loop: false,
			showCursor: true,
			cursorChar: "|"
				};
			jQuery('t' + t_count + 'T').fadeIn(1000);
			new Typed(span, options)
		}
	}
	type.appendChild(div);
	t_count++;
}

function nextTyper(){
	if(t_count < t_total){
		type(typers[t_order[t_i]]);
		t_i++;
	}
}

// Hide typed content
function hide_T() {
	jQuery("#terminalT").siblings().hide();
}

// Main animations
function coverIn(){
	var type = document.getElementById("coverT");
	if(type){
		jQuery('div:not(".T")').fadeOut(1000);
		jQuery('#terminalT').fadeOut(1000);
		jQuery('#coverT').delay(1000).fadeIn(1000);
	}
}

function coverOut(){
	var type = document.getElementById("coverT");
	if(type){
		jQuery('div:not(".T")').delay(1000).fadeIn(1000);
		jQuery('#terminalT').delay(1000).fadeIn(1000);
		jQuery('#coverT').fadeOut(1000);
	}
}

function terminalIn(){
	var type = document.getElementById("terminal");
	options = {
		strings:  ['>^5000run lampoonAI.py', '>^5000run lampoonAI.py', '>^5000run lam.py^2000 `<br>lam.py does not exist<br>`>^5000run poon.py^2000 `<br>poon.py does not exist<br>`>^5000run poo.py^2000 `<br>intitalizing poo.py`^2000 `<br>poo.py is running`^2000 `<br>poo.py overflow`^2000 `<br>cleaning up poo.py`^2000 `<br>generating random AI content`'],
	typeSpeed: 40,
	backSpeed: 100,
	backDelay: 1000,
	loop: false,
	cursorChar: "_",
	/*onComplete: function () {
     jQuery(".typed-cursor").hide();}*/
  };
	if(type){
		jQuery('div:not(.T)').fadeTo(0, 0);;
		jQuery('#terminalT').fadeIn(0);
		new Typed(type, options);
	}

}

function terminal2In(){
	var type = document.getElementById("terminal");
	options = {
		strings:  ['>run lampoonAI.py', '>run lampoonAI(MultiThread).py^2000 `<br>generating random content` `<br>ready set read...`'],
	typeSpeed: 40,
	backSpeed: 100,
	backDelay: 1000,
	loop: false,
	cursorChar: "_",
	/*onComplete: function () {
     jQuery(".typed-cursor").hide();}*/
  };
	if(type){
		jQuery('div:not(.T)').fadeTo(0, 0);;
		jQuery('#terminalT').fadeIn(0);
		new Typed(type, options);
	}

}

function removeOutBack(){
			jQuery('div:not(.T)').fadeTo(0, 0);
		}

function fadeInBack(){
			jQuery('div:not(.T)').fadeTo(1000, 1);
			if (jQuery(".main_logo").length){
					jQuery('html, body').animate({
			        scrollTop: jQuery(".main_logo").offset().top
			    }, 1000);
			}
				if(jQuery('#terminalT').length){
					jQuery('html, body').delay(2000).animate({
			        scrollTop: jQuery("#terminalT").offset().top
			    }, 1000);
			}
			if(jQuery('#type').length){
					jQuery('html, body').delay(4000).animate({
			        scrollTop: jQuery("#type").offset().top
			    }, 1000);
			}
}

function helpIn(){
	var type = document.getElementById("help");
	options = {
	strings: ["Double click to skip", "Press ENTER to skip all"],
	typeSpeed: 0,
	backSpeed: 0,
	startDelay: 1000,
	backDelay: 6000,
	loop: false,
	cursorChar: "|",
	/*onComplete: function () {
     jQuery(".typed-crsor").hide();}*/
  };
	if(type){
		jQuery('#helpT').fadeIn(1000);
		new Typed(type, options);
	}
}

function helpOut(){
	var type = document.getElementById("help");
	if(type){
		jQuery('#helpT').fadeOut(1000);
	}
	
}

function addTs(){
	addT("Hey Angel- <br><br>^2000 Thanks for letting me read your college essay! I’ve left a few comments below.<br><br>^2000 Love, Dad -When you say “struggle,” I would replace it with a more positive word, like “character development.”<br><br>^2000 -Add some more context to the second paragraph. Right now, it looks like I abandoned you at the water park, which I would only do if there was a work emergency. And there was. I found that out after I got home.<br><br>^2000 -This “my father” character sounds like a real jerk. Maybe use a different name? Any other name. Like “family member” or “paternal figure.”<br><br>^2000 -That’s not how I remember your near-drowning.<br><br>^2000 -I was drinking diet coke when I came to pick you up. I remember because the nurse said no outside drinks.<br><br>^2000 -Be sure to watch your verb tenses.<br><br>^2000 -In hindsight, “sink or swim” does sound a bit harsh.<br><br>^2000 -Line 25. Find a way to spin this—for example, you now know how to perform CPR on yourself.<br><br>^2000 -In my defense, I could only save one of you, and your brother can’t tread water.<br><br>^2000 -I had no idea the therapist we got you was for your aquaphobia. I thought it was because you were having teen troubles.<br><br>^2000 -There’s a spelling error in “attempted emancipation.”<br><br>^2000 -So… all those water polo games… our father-daughter synchronized diving routines… our family vacation to Venice? I am so sorry.<br><br>^2000 -Beautiful conclusion. Did you mean what you said about not being on speaking terms?<br><br>",
		'<img id="il1" src="http://lampooncomp.byethost4.com/wp-content/uploads/2020/03/comix-1024x663.jpg" align="left" style="width: 300px; margin: 0px 10px 0px 0px;"/>',
		'<h1>Piece 1</h1>');
	addT("If you make your password a real word make it assword because that'll make your hacker laugh. You can also make it sharp_as_sword if your name is Shar which works on a lot of levels, but just a heads up that is my password to everything so I might accidentally log in to your accounts and send myself some emails.<br><br>^2000 Never, ever, tell anyone your password. If you accidentally say your password, lie about it right after. I have never told anyone my password. Don't even tell your mother your password, especially if your password is dad_left_because_he_was_cheating_on_you, because then your mom will disable your upgraded OKCupid account and you'll lose all your progress right when you were so close to making the engagement round and finally winning the game.<br><br>^2000 Numbers make your password strong. Make your password 01001001 01000001 01101101 01110100 01101000 01100101 01000110 01000010 01001001. That says ‘I am the FBI' in binary, and hackers know about binary so I guarantee they will run for the hills.<br><br>^2000 Always, always tell your password to one trustworthy person, like your mom, in case you die and someone needs to keep brushing your virtual horses and feeding your virtual moms.<br><br>^2000 Changing your password often is essential. A good rule of thumb is to change your password every season or four times a year, whichever is more often. Don't change it too often or you'll confuse the hackers. We're all just people after all, and we're all in this together.<br><br>^2000 If your password is hacked your hacker will have to answer a security question. Make your passwords red herrings, like my_first_pet's_name_is_red_herring if Red Herring is actually your sister's name, or my_maiden_name_is_Elizabeth if maiden names are an entirely outdated concept and you'll be keeping your name through marriage. Make your password my_first_kiss_was_at_an_anime_convention if your first kiss was actually on the sidewalk outside of the anime convention while my dad waited in the car.<br><br>^2000 To complete the password trifecta add symbols, like the exclamation point or the motif of the raven in Edgar Allen Poe's The Raven. Symbols serve as double duty password defense. Consider the following passwords: do_not_hack_me, and do_not!!_hack_me!!!. Which one is more likely to be hacked? Now consider the following password: Moby_Dick_symbolizes_God. Would that password be hacked? No, because nobody wants to hack a nerd.<br><br>^2000 Deep down, passwords are hackable because conscious minds are predictable. A medically-induced coma is a great way to break your mortal bonds and ascend to a higher realm of consciousness to brainstorm passwords that are gonna be harder to predict. If you use that method, write down your password backwards on a napkin. Tattoo it on your body backwards, so that it's double backwards and double safe. Break all the mirrors so hackers can't figure it out. If you forget your password, simply use the reflection of a stagnant pond to look at yourself and think about how dumb you are. You can't even remember a simple password.<br><br>",
		'<img id="il1" src="http://lampooncomp.byethost4.com/wp-content/uploads/2020/03/comix-1024x663.jpg" align="right" style="width: 300px; margin: 0px 10px 0px 0px;"/>',
		'<h1>Piece 2</h1>');
	addT("Frankly, it seemed certain that Marco would get lunch detention. Frank Lee, our principal, along with the entire student body, literally witnessed Marco throw the bag of flaming poop at Mrs. Pompeo during the morning assembly. But much like a carnival worker who knows how to operate the jaws of life when a ride malfunctions, sandwiching a child onto the tracks, I knew how to get people off. And luckily, Marco knew just where to find me.<br><br>^2000 “Come in and close the door. I don't pay to heat the hallway,” I snarl at him.<br><br>^2000 “This is your office? I didn't expect it to be-”<br><br>^2000 “To be what? The women's locker room? I'm not gonna say it again. Close the door and sit down.”<br><br>^2000 “I'm not comfortable being here, man. There's tons of girls here. P.E. meets this period.”<br><br>^2000 “Jesus Marco, they don't notice us.”<br><br>^2000 “They're all staring at you and yelling at us to get out, dude.”<br><br>^2000 “Fine. We can meet in my conference room. Let's hurry. Your trial with Principal Lee is next period.”<br><br>^2000 Things were off to a terrible start. This kid clearly didn't have the charisma or name to weasel his way out of the grip of justice. He attempted to plead his case to me on the walk over to my conference room.<br><br>^2000 “Keep your mouth shut until we're in the room. You have no idea who the prosecution will call as a witness. Mrs. Pompeo could have ears all over this hallway.”<br><br>^2000 “Hey as my lawyer aren't you supposed to know who the witnesses are going to be?”<br><br>^2000 “I like to keep the element of surprise on my side. We will both find out together during the trial. We're here.”<br><br>^2000 “You're kidding. This is the conference room? But it's the-”<br><br>^2000 “The Teacher's Locker Room. That's right.”<br><br>^2000 I questioned Marco brutally for the remaining 30 minutes of the period. I came at him from every angle. “Did you throw the poop?! How did you throw the poop?! Is your name Marco?!” That sort of thing. Finally, I thought we might have built a case. If Marco was just able to somehow cram himself into a tiny jar, he could claim that it would be impossible for him to have thrown the poop because he was in a tiny little jar. We stopped outside Principal Lee's door.<br><br>^2000 “Remember our defense. It's airtight. All we can do now for your sake, Marco, is pray that the scales of justice were made in Mexico. They'll tilt in favor of one of their descendents.” “I promise you, dude. My family is Italian.”<br><br>^2000 “My apologies–hecho en Mexico,” I said, cutting him off.<br><br>^2000 “Ah hello Marco,” said Principal Lee. “And you, unnamed lawyer kid, you're not really supposed to be here but this'll be fast so I suppose you can stay. Marco did you throw the poop?”<br><br>^2000 “Yes.”<br><br>^2000 “Ok. I'm afraid I'll have to give you lunch detention.”<br><br>^2000 “Ehem. Sidebar, Marco. Despite what I promised earlier, I actually do get paid whether we win or lose the trial.”<br><br>^2000 We started towards the door, my head held high, Marco crying about something or other.<br><br>^2000 “Oh and one more thing, Marco,” Principal Lee said. “Coach Stevens told me you missed P.E. today and so I'm afraid-”<br><br>^2000 “Another day of lunch detention?” Marco choked out through tears.<br><br>^2000 “Death. Alright you two boys run along. The hangman will send for you next period Marco.”<br><br>",
		'<img id="il1" src="http://lampooncomp.byethost4.com/wp-content/uploads/2020/03/comix-1024x663.jpg" align="left" style="width: 300px; margin: 0px 10px 0px 0px;"/>',
		'<h1>Piece 3</h1>');
	addT("Hey Angel- <br><br>^2000 Thanks for letting me read your college essay! I’ve left a few comments below.<br><br>^2000 Love, Dad -When you say “struggle,” I would replace it with a more positive word, like “character development.”<br><br>^2000 -Add some more context to the second paragraph. Right now, it looks like I abandoned you at the water park, which I would only do if there was a work emergency. And there was. I found that out after I got home.<br><br>^2000 -This “my father” character sounds like a real jerk. Maybe use a different name? Any other name. Like “family member” or “paternal figure.”<br><br>^2000 -That’s not how I remember your near-drowning.<br><br>^2000 -I was drinking diet coke when I came to pick you up. I remember because the nurse said no outside drinks.<br><br>^2000 -Be sure to watch your verb tenses.<br><br>^2000 -In hindsight, “sink or swim” does sound a bit harsh.<br><br>^2000 -Line 25. Find a way to spin this—for example, you now know how to perform CPR on yourself.<br><br>^2000 -In my defense, I could only save one of you, and your brother can’t tread water.<br><br>^2000 -I had no idea the therapist we got you was for your aquaphobia. I thought it was because you were having teen troubles.<br><br>^2000 -There’s a spelling error in “attempted emancipation.”<br><br>^2000 -So… all those water polo games… our father-daughter synchronized diving routines… our family vacation to Venice? I am so sorry.<br><br>^2000 -Beautiful conclusion. Did you mean what you said about not being on speaking terms?<br><br>",
		'<img id="il1" src="http://lampooncomp.byethost4.com/wp-content/uploads/2020/03/comix-1024x663.jpg" align="left" style="width: 300px; margin: 0px 10px 0px 0px;"/>',
		'<h1>Piece 4</h1>');
	addT("If you make your password a real word make it assword because that'll make your hacker laugh. You can also make it sharp_as_sword if your name is Shar which works on a lot of levels, but just a heads up that is my password to everything so I might accidentally log in to your accounts and send myself some emails.<br><br>^2000 Never, ever, tell anyone your password. If you accidentally say your password, lie about it right after. I have never told anyone my password. Don't even tell your mother your password, especially if your password is dad_left_because_he_was_cheating_on_you, because then your mom will disable your upgraded OKCupid account and you'll lose all your progress right when you were so close to making the engagement round and finally winning the game.<br><br>^2000 Numbers make your password strong. Make your password 01001001 01000001 01101101 01110100 01101000 01100101 01000110 01000010 01001001. That says ‘I am the FBI' in binary, and hackers know about binary so I guarantee they will run for the hills.<br><br>^2000 Always, always tell your password to one trustworthy person, like your mom, in case you die and someone needs to keep brushing your virtual horses and feeding your virtual moms.<br><br>^2000 Changing your password often is essential. A good rule of thumb is to change your password every season or four times a year, whichever is more often. Don't change it too often or you'll confuse the hackers. We're all just people after all, and we're all in this together.<br><br>^2000 If your password is hacked your hacker will have to answer a security question. Make your passwords red herrings, like my_first_pet's_name_is_red_herring if Red Herring is actually your sister's name, or my_maiden_name_is_Elizabeth if maiden names are an entirely outdated concept and you'll be keeping your name through marriage. Make your password my_first_kiss_was_at_an_anime_convention if your first kiss was actually on the sidewalk outside of the anime convention while my dad waited in the car.<br><br>^2000 To complete the password trifecta add symbols, like the exclamation point or the motif of the raven in Edgar Allen Poe's The Raven. Symbols serve as double duty password defense. Consider the following passwords: do_not_hack_me, and do_not!!_hack_me!!!. Which one is more likely to be hacked? Now consider the following password: Moby_Dick_symbolizes_God. Would that password be hacked? No, because nobody wants to hack a nerd.<br><br>^2000 Deep down, passwords are hackable because conscious minds are predictable. A medically-induced coma is a great way to break your mortal bonds and ascend to a higher realm of consciousness to brainstorm passwords that are gonna be harder to predict. If you use that method, write down your password backwards on a napkin. Tattoo it on your body backwards, so that it's double backwards and double safe. Break all the mirrors so hackers can't figure it out. If you forget your password, simply use the reflection of a stagnant pond to look at yourself and think about how dumb you are. You can't even remember a simple password.<br><br>",
		'<img id="il1" src="http://lampooncomp.byethost4.com/wp-content/uploads/2020/03/comix-1024x663.jpg" align="right" style="width: 300px; margin: 0px 10px 0px 0px;"/>',
		'<h1>Piece 5</h1>');
	addT("Frankly, it seemed certain that Marco would get lunch detention. Frank Lee, our principal, along with the entire student body, literally witnessed Marco throw the bag of flaming poop at Mrs. Pompeo during the morning assembly. But much like a carnival worker who knows how to operate the jaws of life when a ride malfunctions, sandwiching a child onto the tracks, I knew how to get people off. And luckily, Marco knew just where to find me.<br><br>^2000 “Come in and close the door. I don't pay to heat the hallway,” I snarl at him.<br><br>^2000 “This is your office? I didn't expect it to be-”<br><br>^2000 “To be what? The women's locker room? I'm not gonna say it again. Close the door and sit down.”<br><br>^2000 “I'm not comfortable being here, man. There's tons of girls here. P.E. meets this period.”<br><br>^2000 “Jesus Marco, they don't notice us.”<br><br>^2000 “They're all staring at you and yelling at us to get out, dude.”<br><br>^2000 “Fine. We can meet in my conference room. Let's hurry. Your trial with Principal Lee is next period.”<br><br>^2000 Things were off to a terrible start. This kid clearly didn't have the charisma or name to weasel his way out of the grip of justice. He attempted to plead his case to me on the walk over to my conference room.<br><br>^2000 “Keep your mouth shut until we're in the room. You have no idea who the prosecution will call as a witness. Mrs. Pompeo could have ears all over this hallway.”<br><br>^2000 “Hey as my lawyer aren't you supposed to know who the witnesses are going to be?”<br><br>^2000 “I like to keep the element of surprise on my side. We will both find out together during the trial. We're here.”<br><br>^2000 “You're kidding. This is the conference room? But it's the-”<br><br>^2000 “The Teacher's Locker Room. That's right.”<br><br>^2000 I questioned Marco brutally for the remaining 30 minutes of the period. I came at him from every angle. “Did you throw the poop?! How did you throw the poop?! Is your name Marco?!” That sort of thing. Finally, I thought we might have built a case. If Marco was just able to somehow cram himself into a tiny jar, he could claim that it would be impossible for him to have thrown the poop because he was in a tiny little jar. We stopped outside Principal Lee's door.<br><br>^2000 “Remember our defense. It's airtight. All we can do now for your sake, Marco, is pray that the scales of justice were made in Mexico. They'll tilt in favor of one of their descendents.” “I promise you, dude. My family is Italian.”<br><br>^2000 “My apologies–hecho en Mexico,” I said, cutting him off.<br><br>^2000 “Ah hello Marco,” said Principal Lee. “And you, unnamed lawyer kid, you're not really supposed to be here but this'll be fast so I suppose you can stay. Marco did you throw the poop?”<br><br>^2000 “Yes.”<br><br>^2000 “Ok. I'm afraid I'll have to give you lunch detention.”<br><br>^2000 “Ehem. Sidebar, Marco. Despite what I promised earlier, I actually do get paid whether we win or lose the trial.”<br><br>^2000 We started towards the door, my head held high, Marco crying about something or other.<br><br>^2000 “Oh and one more thing, Marco,” Principal Lee said. “Coach Stevens told me you missed P.E. today and so I'm afraid-”<br><br>^2000 “Another day of lunch detention?” Marco choked out through tears.<br><br>^2000 “Death. Alright you two boys run along. The hangman will send for you next period Marco.”<br><br>",
		'<img id="il1" src="http://lampooncomp.byethost4.com/wp-content/uploads/2020/03/comix-1024x663.jpg" align="left" style="width: 300px; margin: 0px 10px 0px 0px;"/>',
		'<h1>Piece 6</h1>');
	addT("Hey Angel- <br><br>^2000 Thanks for letting me read your college essay! I’ve left a few comments below.<br><br>^2000 Love, Dad -When you say “struggle,” I would replace it with a more positive word, like “character development.”<br><br>^2000 -Add some more context to the second paragraph. Right now, it looks like I abandoned you at the water park, which I would only do if there was a work emergency. And there was. I found that out after I got home.<br><br>^2000 -This “my father” character sounds like a real jerk. Maybe use a different name? Any other name. Like “family member” or “paternal figure.”<br><br>^2000 -That’s not how I remember your near-drowning.<br><br>^2000 -I was drinking diet coke when I came to pick you up. I remember because the nurse said no outside drinks.<br><br>^2000 -Be sure to watch your verb tenses.<br><br>^2000 -In hindsight, “sink or swim” does sound a bit harsh.<br><br>^2000 -Line 25. Find a way to spin this—for example, you now know how to perform CPR on yourself.<br><br>^2000 -In my defense, I could only save one of you, and your brother can’t tread water.<br><br>^2000 -I had no idea the therapist we got you was for your aquaphobia. I thought it was because you were having teen troubles.<br><br>^2000 -There’s a spelling error in “attempted emancipation.”<br><br>^2000 -So… all those water polo games… our father-daughter synchronized diving routines… our family vacation to Venice? I am so sorry.<br><br>^2000 -Beautiful conclusion. Did you mean what you said about not being on speaking terms?<br><br>",
		'<img id="il1" src="http://lampooncomp.byethost4.com/wp-content/uploads/2020/03/comix-1024x663.jpg" align="left" style="width: 300px; margin: 0px 10px 0px 0px;"/>',
		'<h1>Piece 7</h1>');
	addT("If you make your password a real word make it assword because that'll make your hacker laugh. You can also make it sharp_as_sword if your name is Shar which works on a lot of levels, but just a heads up that is my password to everything so I might accidentally log in to your accounts and send myself some emails.<br><br>^2000 Never, ever, tell anyone your password. If you accidentally say your password, lie about it right after. I have never told anyone my password. Don't even tell your mother your password, especially if your password is dad_left_because_he_was_cheating_on_you, because then your mom will disable your upgraded OKCupid account and you'll lose all your progress right when you were so close to making the engagement round and finally winning the game.<br><br>^2000 Numbers make your password strong. Make your password 01001001 01000001 01101101 01110100 01101000 01100101 01000110 01000010 01001001. That says ‘I am the FBI' in binary, and hackers know about binary so I guarantee they will run for the hills.<br><br>^2000 Always, always tell your password to one trustworthy person, like your mom, in case you die and someone needs to keep brushing your virtual horses and feeding your virtual moms.<br><br>^2000 Changing your password often is essential. A good rule of thumb is to change your password every season or four times a year, whichever is more often. Don't change it too often or you'll confuse the hackers. We're all just people after all, and we're all in this together.<br><br>^2000 If your password is hacked your hacker will have to answer a security question. Make your passwords red herrings, like my_first_pet's_name_is_red_herring if Red Herring is actually your sister's name, or my_maiden_name_is_Elizabeth if maiden names are an entirely outdated concept and you'll be keeping your name through marriage. Make your password my_first_kiss_was_at_an_anime_convention if your first kiss was actually on the sidewalk outside of the anime convention while my dad waited in the car.<br><br>^2000 To complete the password trifecta add symbols, like the exclamation point or the motif of the raven in Edgar Allen Poe's The Raven. Symbols serve as double duty password defense. Consider the following passwords: do_not_hack_me, and do_not!!_hack_me!!!. Which one is more likely to be hacked? Now consider the following password: Moby_Dick_symbolizes_God. Would that password be hacked? No, because nobody wants to hack a nerd.<br><br>^2000 Deep down, passwords are hackable because conscious minds are predictable. A medically-induced coma is a great way to break your mortal bonds and ascend to a higher realm of consciousness to brainstorm passwords that are gonna be harder to predict. If you use that method, write down your password backwards on a napkin. Tattoo it on your body backwards, so that it's double backwards and double safe. Break all the mirrors so hackers can't figure it out. If you forget your password, simply use the reflection of a stagnant pond to look at yourself and think about how dumb you are. You can't even remember a simple password.<br><br>",
		'<img id="il1" src="http://lampooncomp.byethost4.com/wp-content/uploads/2020/03/comix-1024x663.jpg" align="right" style="width: 300px; margin: 0px 10px 0px 0px;"/>',
		'<h1>Piece 8</h1>');
	addT("Frankly, it seemed certain that Marco would get lunch detention. Frank Lee, our principal, along with the entire student body, literally witnessed Marco throw the bag of flaming poop at Mrs. Pompeo during the morning assembly. But much like a carnival worker who knows how to operate the jaws of life when a ride malfunctions, sandwiching a child onto the tracks, I knew how to get people off. And luckily, Marco knew just where to find me.<br><br>^2000 “Come in and close the door. I don't pay to heat the hallway,” I snarl at him.<br><br>^2000 “This is your office? I didn't expect it to be-”<br><br>^2000 “To be what? The women's locker room? I'm not gonna say it again. Close the door and sit down.”<br><br>^2000 “I'm not comfortable being here, man. There's tons of girls here. P.E. meets this period.”<br><br>^2000 “Jesus Marco, they don't notice us.”<br><br>^2000 “They're all staring at you and yelling at us to get out, dude.”<br><br>^2000 “Fine. We can meet in my conference room. Let's hurry. Your trial with Principal Lee is next period.”<br><br>^2000 Things were off to a terrible start. This kid clearly didn't have the charisma or name to weasel his way out of the grip of justice. He attempted to plead his case to me on the walk over to my conference room.<br><br>^2000 “Keep your mouth shut until we're in the room. You have no idea who the prosecution will call as a witness. Mrs. Pompeo could have ears all over this hallway.”<br><br>^2000 “Hey as my lawyer aren't you supposed to know who the witnesses are going to be?”<br><br>^2000 “I like to keep the element of surprise on my side. We will both find out together during the trial. We're here.”<br><br>^2000 “You're kidding. This is the conference room? But it's the-”<br><br>^2000 “The Teacher's Locker Room. That's right.”<br><br>^2000 I questioned Marco brutally for the remaining 30 minutes of the period. I came at him from every angle. “Did you throw the poop?! How did you throw the poop?! Is your name Marco?!” That sort of thing. Finally, I thought we might have built a case. If Marco was just able to somehow cram himself into a tiny jar, he could claim that it would be impossible for him to have thrown the poop because he was in a tiny little jar. We stopped outside Principal Lee's door.<br><br>^2000 “Remember our defense. It's airtight. All we can do now for your sake, Marco, is pray that the scales of justice were made in Mexico. They'll tilt in favor of one of their descendents.” “I promise you, dude. My family is Italian.”<br><br>^2000 “My apologies–hecho en Mexico,” I said, cutting him off.<br><br>^2000 “Ah hello Marco,” said Principal Lee. “And you, unnamed lawyer kid, you're not really supposed to be here but this'll be fast so I suppose you can stay. Marco did you throw the poop?”<br><br>^2000 “Yes.”<br><br>^2000 “Ok. I'm afraid I'll have to give you lunch detention.”<br><br>^2000 “Ehem. Sidebar, Marco. Despite what I promised earlier, I actually do get paid whether we win or lose the trial.”<br><br>^2000 We started towards the door, my head held high, Marco crying about something or other.<br><br>^2000 “Oh and one more thing, Marco,” Principal Lee said. “Coach Stevens told me you missed P.E. today and so I'm afraid-”<br><br>^2000 “Another day of lunch detention?” Marco choked out through tears.<br><br>^2000 “Death. Alright you two boys run along. The hangman will send for you next period Marco.”<br><br>",
		'<img id="il1" src="http://lampooncomp.byethost4.com/wp-content/uploads/2020/03/comix-1024x663.jpg" align="left" style="width: 300px; margin: 0px 10px 0px 0px;"/>',
		'<h1>Piece 9</h1>');
	addT("Hey Angel- <br><br>^2000 Thanks for letting me read your college essay! I’ve left a few comments below.<br><br>^2000 Love, Dad -When you say “struggle,” I would replace it with a more positive word, like “character development.”<br><br>^2000 -Add some more context to the second paragraph. Right now, it looks like I abandoned you at the water park, which I would only do if there was a work emergency. And there was. I found that out after I got home.<br><br>^2000 -This “my father” character sounds like a real jerk. Maybe use a different name? Any other name. Like “family member” or “paternal figure.”<br><br>^2000 -That’s not how I remember your near-drowning.<br><br>^2000 -I was drinking diet coke when I came to pick you up. I remember because the nurse said no outside drinks.<br><br>^2000 -Be sure to watch your verb tenses.<br><br>^2000 -In hindsight, “sink or swim” does sound a bit harsh.<br><br>^2000 -Line 25. Find a way to spin this—for example, you now know how to perform CPR on yourself.<br><br>^2000 -In my defense, I could only save one of you, and your brother can’t tread water.<br><br>^2000 -I had no idea the therapist we got you was for your aquaphobia. I thought it was because you were having teen troubles.<br><br>^2000 -There’s a spelling error in “attempted emancipation.”<br><br>^2000 -So… all those water polo games… our father-daughter synchronized diving routines… our family vacation to Venice? I am so sorry.<br><br>^2000 -Beautiful conclusion. Did you mean what you said about not being on speaking terms?<br><br>",
		'<img id="il1" src="http://lampooncomp.byethost4.com/wp-content/uploads/2020/03/comix-1024x663.jpg" align="left" style="width: 300px; margin: 0px 10px 0px 0px;"/>',
		'<h1>Piece 10</h1>');
}

// Onload function
function initialise() {
	if (jQuery(".main_logo").length){
		jQuery('html, body').animate({
        scrollTop: jQuery(".main_logo").offset().top
    }, 0000);
	}

	if(jQuery('#terminalT').length){
		jQuery('html, body').animate({
        scrollTop: jQuery("#terminalT").offset().top
    }, 0000);
		jQuery('#terminalT').parents().addClass('T');
		// pre set up typers
		hide_T();
		shuffle(t_order);
		t_i = 0;
		addTs();
	} else{
		sessionStorage.visits = 1;
	}

	var type = document.getElementsByClassName("is-search-input");
	var options = {
	strings: ['SEARCH', 'FIND A JOKE', 'POKE ME', 'BUSCAR','BUS CAR', 'NOTICE ME', 'MIDGET PUNS'],
	attr: 'placeholder',
	typeSpeed: 100,
	backSpeed: 100,
	backDelay: 20000,
	loop: true,
	cursorChar: '|',
	showCursor: true,
	bindInputFocusEvents: true,
	shuffle: 1,
	// fadeOut: true,
	// fadeOutClass: 'typed-fade-out',
	// autoInsertCss: true,
	};
	for (i = 0; i < type.length; i++){
		new Typed(type[i], options);
	}

	type = document.getElementById("about");
	options = {
	stringsElement: "#aboutS",
	typeSpeed: 0,
	backSpeed: 100,
	backDelay: 0,
	loop: false,
	showCursor: true,
	cursorChar: "|"
		};
	if(type)
	new Typed(type, options);

	
	// MultiThread
	if(jQuery('body.home').length && sessionStorage.visits){
	push(terminal2In, 0);
	push(fadeInBack, 10000);
	var intv = 0;
	for (var i = 0; i<t_order.length; i++)
	push(nextTyper, 11000 + i * intv);
	}

	// First homepage load
	if(jQuery('body.home').length && !sessionStorage.visits){
	// Remove adds for 1 min
	if(jQuery('.g').length){
		jQuery('.g').fadeTo(0, 0);
		jQuery('.g').delay(100000).fadeTo(0, 1);
	}
	push(terminalIn, 0);
	push(helpIn, 3000);
	push(helpOut, 20000);
	push(coverIn, 55000);
	push(coverOut, 60000);
	push(fadeInBack, 65000);	
	var intv = 50000;
	for (var i = 0; i<t_order.length; i++)
	push(nextTyper, 70000 + i * intv);
	}

	jQuery('body').fadeTo(1000, 1);

}
jQuery(document).ready(initialise);

// Double click
var touchtime = 0;
jQuery("html").on("click", function() {
    if (touchtime == 0) {
        // set first click
        touchtime = new Date().getTime();
    } else {
        // compare first click to this click and see if they occurred within double click threshold
        if (((new Date().getTime()) - touchtime) < 800) {
            // double click occurred
            clearPlayNext();
            touchtime = 0;
        } else {
            // not a double click so set as a new first click
            touchtime = new Date().getTime();
        }
    }
});

// Enter
jQuery(document).on('keypress',function(e) {
    if(e.which == 13) {
    	 clearPlayAll();
    }
});