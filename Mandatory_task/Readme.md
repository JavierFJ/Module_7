# Module 7: Data Visualization

## Mandatory Task

### How to start the project 

These three files (index1,data1 and main1) must been placed in the same directory. To visualize the resulting chart, open the index1.html file with any web browser.

### Purpose of this task

This task consists in taking as basis the barchart refactor and modify it following the next steps:

-  Adding space between columns.

-  Adding colors to each bar.

-  Adding a legend.

-  Showing the chart vertically.

### Description of the project

The idea of this project is to elaborate a column chart which displays some towns of the province of Málaga and their corresponding unemployed population for the first six months of 2014, being based on the code of the [barchart refactor] (https://github.com/Lemoncode/d3js-samples/tree/master/samples/02%20Charts/04%20BarChartRefactor).

#### Step 1: collecting data

To obtain the rate of unemployment in the province, I have downloaded the json file from the section open data from the [web of the Málaga's provincial goverment] (http://www.malaga.es/gobiernoabierto/datosabiertos/catalogodatos/cnl-595/com1_md1_cd-197837/desempleo-provincia-malaga), year 2014.  

Once I have this file, I have left only the first 6 towns of the list, sorted by alphabetical order (Alameda,Alcaucín,Alfarnate,Alfarnatejo,Algarrobo and Algatocín), removing the rest of the rows from the json file.

In this way, the file data1 of muy project will be composed of 6 dictionaries, where the keys are *Town* and *Population*.


#### Step 2: Elaborating basic bar refactor

The project is composed of 3 files related each other:
- Index1, in html format: it will be visualized in a web browser.
- Data1, in js: containing data in dictionaries as commented before, saved in a variable *totalun*.
- Main, in js: containing the code in javascript of the column chart.

Let's focus now on the last file, main.js and its code:
   
     - First we declare the necessary variables for the code.

     - Then we configurate the size of the canvas and the margins. I have modify the margins and dimensions with respect to the original code.

     - After that, we setup both axis, where the y axis will represent the 6 towns (through the use of map function) from 0 to the last town and axis x, which represents the unemployed population, from 0 to the maximum quantity.

     - Once configurated the axis, they are inserted into the graph and been translated to their corresponding place.

     - Eventually we append the rectangles to create the las part of the graph (as it is going to be a column chart, we need the columns, that is, the rectangles), adjusting their position throught heir respective upper-corner, so as to represent adequatly the data (widht=unemployed population)


#### Step 3: Showing the chart vertically

Basically I had to change the axis setup, that is, changing the domains:

     - Axis x: now it will represent the towns due to the function map, which creates a new array with towns.

     - Axis y: now it will represent the unemployed population, from 0 to the maximum quantity.

And changing the way of appending the rectangles:

    - The coordinates of the upper corners are inverted (x for town, y for unenmployed population)

                      
#### Step 4: Adding space between columns

When appending the rectangles, in the attribute width of each one, I subtract from the bandwidth 20 units, in this way I can create spaces between each column.

#### Step 5: Adding colors to each bar

Through the declaration of a variable called barColor, an ordinal scale with a gradient of a color with 6 different tonalities (whose hexadecimal expression has been looked for in this [web page](https://html-color-codes.info/codigos-de-colores-hexadecimales/)), I have been able to fill each rectangle when theis appending according to their value (in this case, *town*).

#### Step 6: Adding a legend

Once I have created all the previous code, I create a new function **AppendLegend()**, which calls the class legend for our specific data (totalun) and insert the text of the legend (an asterisk followed by the name of the town, with the color provide by *barColor* and pinpointed at the upper-right corner of the canvas, with each decreasing town moved forward).

With the parameter i I could place each text according to its corresponding town.

#### Step 7: Inserting axis labels

This step is not mandatory, but I decided to include it (in order to improve the appareance of the graph ).
To do that, I have created two svg text objects, translated them to their corresponding place ("Town" for X axis and "Unemployed Population" for Y axis) and eventually anchored the text in the middel of each axis.

#### Results

![Column chart](https://github.com/JavierFJ/Module_7/blob/master/Mandatory_task/Task1.png?raw=true)
