// import { NextRequest, NextResponse } from 'next/server';
// import { transporter } from '../../newsletter/core';
// import Query from '@/models/Query'; // Adjust the import path as needed
// import { connectToDB } from '@/utils/db';

// export async function POST(req: NextRequest) {
//     await connectToDB(); // Connect to the database

//     const requestBody = await req.json();
//     const { name, email, answer, queryId } = requestBody;

//     if (!email || !queryId) {
//         return NextResponse.json({ error: 'Email and Query ID are required' }, { status: 400 });
//     }

//     try {
//         // Find the query by ID
//         const query = await Query.findById(queryId);

//         if (!query) {
//             return NextResponse.json({ error: 'Query not found' }, { status: 404 });
//         }

//         // Update the query status to answered
//         query.status = 'answered';
//         await query.save();

//         // Send email
//         const info = await transporter.sendMail({
//             from: '"CSK Textiles" <CSK@gmail.com>',
//             to: email,
//             subject: "We have answered your query",
//             text: `Our Specialist has answered your query: ${answer}`,
//             html: `
//         <html>
//           <body>
//             <h4>Hi ${name}, we have answered your Query</h4>
//             <p>Answer: ${answer}</p>
//           </body>
//         </html>
//       `,
//         });

//         return NextResponse.json({
//             message: 'Query updated and email sent',
//             info: info,
//             status: 200
//         });
//     } catch (error) {
//         console.error('Error processing query:', error);
//         return NextResponse.json({ error: 'Error processing query' }, { status: 500 });
//     }
// }



import { NextRequest, NextResponse } from 'next/server';
import { transporter } from '../../newsletter/core';
import Query from '@/models/Query'; // Adjust the import path as needed
import { connectToDB } from '@/utils/db';

export async function POST(req: NextRequest) {
    await connectToDB(); // Connect to the database

    const requestBody = await req.json();
    const { name, email, answer, queryId } = requestBody;

    // Validate input
    if (!email || !queryId || !answer) {
        return NextResponse.json({ error: 'Email, Query ID, and answer are required' }, { status: 400 });
    }

    try {
        // Find the query by ID
        const query = await Query.findById(queryId);

        if (!query) {
            return NextResponse.json({ error: 'Query not found' }, { status: 404 });
        }

        // Ensure 'answers' is an array before pushing
        if (!Array.isArray(query.answers)) {
            query.answers = []; // Initialize 'answers' as an array if it doesn't exist
        }

        // Update the query status to answered and push the new answer
        query.status = 'answered';
        query.answers.push(answer); // Push the new answer to the answers array
        await query.save();

        // Send email
        const info = await transporter.sendMail({
            from: '"CSK Textiles" <CSK@gmail.com>',
            to: email,
            subject: "We have answered your query",
            text: `Our Specialist has answered your query: ${answer}`,
            html: `
                <html>
                  <body>
                    <h4>Hi ${name}, we have answered your Query</h4>
                    <p>Answer: ${answer}</p>
                  </body>
                </html>
            `,
        });

        // Return success response
        return NextResponse.json({
            message: 'Answer added to the query, query updated, and email sent',
            info: info,
            status: 200,
        });
    } catch (error) {
        console.error('Error processing query:', error);
        return NextResponse.json({ error: 'Error processing query' }, { status: 500 });
    }
}
