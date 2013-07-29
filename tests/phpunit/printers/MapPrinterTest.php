<?php

namespace SM\Test;

use SMW\Test\ResultPrinterTestCase as ResultPrinterTestCase;

/**
 *  Tests for the SM\MapPrinter class.
 *
 * @file
 * @since 1.8
 *
 * @ingroup SemanticMaps
 * @ingroup Test
 *
 * @group SemanticMaps
 * @group SMWExtension
 * @group ResultPrinters
 *
 * @licence GNU GPL v2+
 * @author Jeroen De Dauw < jeroendedauw@gmail.com >
 */
class MapPrinterTest extends ResultPrinterTestCase {

	/**
	 * @see ResultPrinterTestCase::getFormats
	 *
	 * @since 1.8
	 *
	 * @return array
	 */
	public function getFormats() {
		return array( 'map' );
	}

	/**
	 * @see ResultPrinterTestCase::getClass
	 *
	 * @since 1.8
	 *
	 * @return string
	 */
	public function getClass() {
		return '\SMMapPrinter';
	}

}
