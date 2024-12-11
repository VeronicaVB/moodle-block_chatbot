<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 *  Web service to get the modules the student has a grade on.
 *
 * @package   block_cgschatbot
 * @copyright 2023 Veronica Bermegui
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


namespace block_cgschatbot\external;


defined('MOODLE_INTERNAL') || die();

require_once('C:\xampp\htdocs\moodle\blocks\cgschatbot\vendor\autoload.php');

use core_external\external_function_parameters;
use core_external\external_value;
use core_external\external_single_structure;
use LLPhant\Chat\OllamaChat;
use LLPhant\OllamaConfig;


require_once($CFG->libdir . '/externallib.php');

/**
 * Trait implementing the external function block_cgsfeedback
 */
trait get_answer {

    /**
     * Returns description of method parameters
     * @return external_function_parameters
     */

    public static function get_answer_parameters() {
        return new external_function_parameters(
           [ 'question' => new external_value(PARAM_RAW, 'question asked') ]
        );
    }

    /**
     * Return context.
     */
    public static function get_answer($question) {
        global $USER, $DB;

        $context = \context_user::instance($USER->id);

        self::validate_context($context);
        // Parameters validation.
        self::validate_parameters(self::get_answer_parameters(), ['question' => $question]);

        $config = new OllamaConfig();
        $config->model = 'llama3';
        $chat = new OllamaChat($config);
        $response = $chat->generateText($question);

        return array(
            'answer' => $response,
        );
    }

    /**
     * Describes the structure of the function return value.
     * @return external_single_structures
     */
    public static function get_answer_returns() {
        return new external_single_structure(array(
            'answer' => new external_value(PARAM_RAW, 'Answer to the question asked'),
        ));
    }
}
