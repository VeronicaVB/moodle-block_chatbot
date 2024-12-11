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
 * Plugin functions for the block_cgschatbot plugin.
 *
 * @package   block_cgschatbot
 * @copyright 2024, Veronica Bermegui <>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

use LLPhant\Chat\OllamaChat;
use LLPhant\OllamaConfig;

defined('MOODLE_INTERNAL') || die();



function llmconfig() {
	$config = new OllamaConfig();
$config->model = 'llama2';
$chat = new OllamaChat($config);
$response = $chat->generateText('what is one + one ?');

}