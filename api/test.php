<?php

/*$s =<<<EOS
<root>
	<project>
	    <name>Alanine</name>
	    <types>
	      <type>print</type>
	      <type>web</type>
	      <type>tv</type>
	    </types>
	</project>
</root>
EOS;

$xml = simplexml_load_string($s);


$data = array();
foreach ($xml->project as $element) {
    foreach($element->children() as $key => $val) {



        if ($key == 'name') {
        	//echo "{$key}: {$val}<br/>";
        	$data[$key] = "{$val}";

	        foreach ($element->types as $types) {
		        foreach ($types->children() as $key2 => $val2) {
		        	//echo "{$key2}: {$val2}<br/>";
		        	$data['types'][] = "{$val2}";
		        }
		    }
		}
    }
}

print_r($data);*/



$xml = simplexml_load_file('../portfolio/5asec/data.xml');

foreach ($xml as $key => $value) {

	if ($key == 'types') {
		foreach ($value->type as $key2 => $value2) {
			$lala['type'][] = "{$value2}";
		}
	} else {
		$lala[$key] = "{$value}";
	}
}


print_r($lala);

?>