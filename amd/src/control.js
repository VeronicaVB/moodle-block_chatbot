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
 * Provides the block_cgschatbot/control module
 *
 * @package   block_cgschatbot
 * @category  output
 * @copyright 2024 onwards Veronica Bermegui
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


define(['core/ajax'],
    function (Ajax) {
        'use strict';

        /**
         * Initializes the block controls.
         */
        function init() {

            function askQuestion(e) {
                e.preventDefault();

                // Disable the button and textarea while getting answer
                const question = document.getElementById('message-input').value;
                // Clear
                document.getElementById('message-input').value = '';

                // Put the  question on the message containers.
                displayQuestionInContainer(question)

                displaytypinganimation();

                disableQuestionSection();

                getResponse(question)




            }

            function disableQuestionSection() {
                document.getElementById('message-input').disabled = true
                document.querySelector('.cgschatbot-ask').disabled = true
            }
            function enableQuestionSection() {
                document.getElementById('message-input').disabled = false
                document.querySelector('.cgschatbot-ask').disabled = false
            }

            function displayQuestionInContainer(question) {
                // Create a new span element
                var newSpan = document.createElement('span');

                // Add the chat-bubble class and user class to the span element
                newSpan.className = 'chat-bubble user';

                // Set the text content of the span element
                newSpan.textContent = question;

                // Get the messages container element
                var messagesContainer = document.getElementById('messages-container');

                // Append the new span element to the messages container
                messagesContainer.appendChild(newSpan);
            }

            function displaytypinganimation() {
                // Create the outer div with class 'col-3'
                var outerDiv = document.createElement('div');
                outerDiv.className = 'col-3';
                outerDiv.id = 'typing-animation';

                // Create the snippet div with data-title attribute
                var snippetDiv = document.createElement('div');
                snippetDiv.className = 'snippet';
                snippetDiv.setAttribute('data-title', 'dot-typing');

                // Create the stage div
                var stageDiv = document.createElement('div');
                stageDiv.className = 'stage';

                // Create the dot-typing div
                var dotTypingDiv = document.createElement('div');
                dotTypingDiv.className = 'dot-typing';

                // Append the dot-typing div to the stage div
                stageDiv.appendChild(dotTypingDiv);

                // Append the stage div to the snippet div
                snippetDiv.appendChild(stageDiv);

                // Append the snippet div to the outer div
                outerDiv.appendChild(snippetDiv);

                // Assuming you want to append this to an existing element with ID 'messages-container'

                var messagesContainer = document.getElementById('messages-container');
                setHeightTypingAnimation();
                messagesContainer.insertAdjacentElement('beforeend', outerDiv); // This will append it at the bottom


            }

            function setHeightTypingAnimation() {
                // Update the height dinamically

                var messagesContainer = document.getElementById('messages-container');
                const typingAnimation = document.querySelector('#typing-animation');

                if (messagesContainer && typingAnimation) {
                    // Get the height of the messages container
                    const containerHeight = messagesContainer.clientHeight;

                    // Get the height of the typing animation element
                    const typingHeight = typingAnimation.offsetHeight;

                    // Set the 'top' property dynamically
                    typingAnimation.style.top = `${containerHeight - typingHeight}px`;
                }
            }

            function removeTypingIndicator() {
                var typingIndicator = document.getElementById('typing-animation');
                if (typingIndicator) {
                    typingIndicator.remove();
                }
            }


            function displayAnswer(answer) {
                // Create a new span element for the assistant message
                var assistantSpan = document.createElement('span');
                assistantSpan.className = 'chat-bubble assistant';

                // Create an img element for the SVG icon
                var icon = document.createElement('img');
                icon.src = M.util.image_url('icon', 'block_cgschatbot'); // Replace with the path to your SVG file
                icon.className = 'icon';

                // Add the icon to the assistant span
                assistantSpan.appendChild(icon);

                // Set the text content of the assistant span
                assistantSpan.appendChild(document.createTextNode(answer));

                var messagesContainer = document.getElementById('messages-container');
                // Append the assistant span element to the messages container
                messagesContainer.appendChild(assistantSpan);
            }


            function getResponse(question) {
                // Ajax call
                disableQuestionSection();
                Ajax.call([
                    {
                        methodname: 'block_cgschatbot_get_answer',
                        args: {
                            question: question,
                        },
                        done: function (response) {
                            removeTypingIndicator();
                            displayAnswer(response.answer);
                            enableQuestionSection();

                        },
                        fail: function (reason) {
                            console.log(reason);
                        }
                    }
                ])
            }

            function addEventListener() {
                document.querySelector('.cgschatbot-ask').addEventListener('click', askQuestion);
                document.querySelector('.cgschatbot-ask').addEventListener('keypress', askQuestion);
            }



            addEventListener();

        }

        return {
            init: init
        };
    });