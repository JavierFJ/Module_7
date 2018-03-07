# Module 7: Data Visualization

## Advanced Task

### How to start the project 

These four files (two .js, a .css and a .html file) must been placed in the same directory. To visualize the resulting chart, open the index2.html file with any web browser.

### Purpose of this task

This task consists in designing any chart with some kind of interaction through the mouse (for example by clicking over the graph).

### Description of the project

The idea of this project is to elaborate a dot chart which displays the population of the city of Malaga along the years.
Passing the mouse arrow over each dot the users can see the pair of values (Year, Population), and the size of the dots will increase by four, and their color will change from black to green.
As well, by clicking on a specific dot an alert will appear showing the year and population of that dot).
The source of data is the [web of the Málaga's provincial goverment] (http://www.malaga.es/gobiernoabierto/datosabiertos/catalogodatos/com1_md1_cd-198081/cnl-594/padron-habitantes) in JSON format. This file contains information about every towns in the province, such as location, code, region where the town belongs and the evolution of the demography.

#### Step 1: collecting and modifying data

Once downloaded the JSON described before, I take only the data corresponding to Malaga city, removing the rest of information (I just select the pair Year, Population, discarding any other type of data).

In this way, the file data2 of my project will be composed of 16 dictionaries, where the keys are *Year* and *Population*.


#### Step 2: Elaborating the chart

##### Step 2.1: Files we need
The project is composed of 4 files related each other:
- index2, in html format: it will be visualized in a web browser.
- data2, in js: containing data in dictionaries as commented before, saved in a variable *malaga*.
- main2, in js: containing the code in javascript of the column chart.
- styles2, in css: containing the necessary formats for the chart (letter font, width of the xis lines,colors...)

Now we are going to focus on the last file, main2.js and its code.

##### Step 2.2: Designing the context of the chart (Canvas and axis)
     
     
- First we declare the necessary variables for the code,for example the margins or the dimensions (width and height of the window) and configurate them.

- Then we design the scale for both axes, keeping in mind that that the axis x will represent the years and the axis y will represent the value of population.
       
    - Axis X: domain from 1997 to the max year according to the data we have and with respect to the range, the maximum allowed by the window, discounting the margins.
    - Axis Y: domain from 528000 to the max value of population and the highest possible range discounting margins, similarly to axis x.

- After designing the scale I translate and orient the axis to their corresponding place, without giving to the axis labels any special format.
  
- To finish with the axes, I append them as a group into the window and at the same time 
I insert the label for each axis (Year and Population), translating and rotating them.
    

##### Step 2.3: Creating the dots and interaction


To insert the dots, I first create the features of the circles which are going to compose the dots. The coordinates of the center of each circle will coincide with the values (Year, Population) and the radius (8).

Then, the data will be represented by appended circles with the previous defined attributes, and they will have two additional attributes: MouseOver and MouseOut, for the interaction with the mouse arrow.   
To add the other type of interactivity (click on the dots to show the values of them in an alert) I include the command .on("click").

Therefore, the MouseOver function is composed of a function that selects the dot which the arrow is aiming and filling it green and increasing it four times its original size.

Besides the selected dots must show the text with the pair (Year, Population), so first I create an id to the text (this will allow me to remove it after easily) and the I append it.

The MouseOut function returns the selected dot to its original configuration (black and radius 8, without text)                    

#### Step 3: Results

Image showing the resulting dot chart:
![Dot char 1](https://github.com/JavierFJ/Module_7/blob/master/Advanced_task/image1.png?raw=true)

Image showing the interaction by passing the mouse arrow over a dot and by clicking on it:
![Dot char 2](https://github.com/JavierFJ/Module_7/blob/master/Advanced_task/image2.png?raw=true)