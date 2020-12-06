import { Component } from '@angular/core';
import { ExecuteService } from '../service/execute.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(
		private executeService: ExecuteService
	){}

	// title
	title = 'Online Code Ide';
	  
	// message
	message = "";

	// ide   
	sourcecode = "#include <iostream>\nusing namespace std;\nint main(){\n\t// your code goes here.\n\treturn 0;\n}";
	userinput = "";

	// language
	languages = ["C++"];
	extension = {"C++": "cpp"}
	selected_language = this.languages[0];

	// file
	file: File = null;
	filename = "Choose File"
	invalidFile = false;

	// output  
	result = "";

	// change language
	onSelect(lang){
		this.selected_language = lang;
		if(this.selected_language == "C++")
		{
			(<HTMLTextAreaElement>document.getElementById("idecode")).value = "#include <iostream>\nusing namespace std;\nint main(){\n\t// your code goes here.\n\treturn 0;\n}";
			this.sourcecode = "#include <iostream>\nusing namespace std;\nint main(){\n\t// your code goes here.\n\treturn 0;\n}";
		}
		else if(this.selected_language == "Python")
		{
			(<HTMLTextAreaElement>document.getElementById("idecode")).value = "";
			this.sourcecode = "";
		}
	}

	// file input
	handleFileInput(files: FileList) {
		this.file = files.item(0);
		this.filename = this.file.name;

		var filetype = this.filename.split(".")[1];
		if(filetype === "cpp"){
			this.selected_language = this.languages[0];
			this.invalidFile = false;
		}
		// else if(filetype === "py"){
		// 	this.selected_language = this.languages[1];
		// 	this.invalidFile = false;
		// }
		else{
			this.selected_language = "Invalid option";
			this.invalidFile = true;
			return;
		}

		let fileReader = new FileReader();
		fileReader.onload = (e) => {
			this.sourcecode = fileReader.result.toString();
		}
		fileReader.readAsText(this.file); 
	}

	// reset all things
	resetFile(){
		this.message = "";

		this.sourcecode = "";
		this.userinput = "";

		this.selected_language = this.languages[0];
		if(this.selected_language == "C++")
		{
			(<HTMLTextAreaElement>document.getElementById("idecode")).value = "#include <iostream>\nusing namespace std;\nint main(){\n\t// your code goes here.\n\treturn 0;\n}";
			this.sourcecode = "#include <iostream>\nusing namespace std;\nint main(){\n\t// your code goes here.\n\treturn 0;\n}";
		}

		this.file = null;
		this.filename = "Choose File";
		this.invalidFile = false;

		this.result = "";

		(<HTMLInputElement>document.getElementById("sourcecodefile")).value = "";
		(<HTMLTextAreaElement>document.getElementById("userinput")).value = "";
		}

	// run btn
	onRun(){
		var code = (<HTMLInputElement>document.getElementById("idecode")).value;
		var input = (<HTMLInputElement>document.getElementById("userinput")).value;
		var filetype = this.extension[this.selected_language];

		// validation
		if(!code.length){
			this.message = "Code or File required."
		}

		this.message = "";

		this.executeService.executeidecodeinput(code, input, filetype).subscribe(
			response => {
				this.result = response["payload"];
				alert(response["message"]);
			}
		);
	}

}
