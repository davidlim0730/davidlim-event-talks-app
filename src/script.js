const talks = [
    {
        id: 'talk1',
        title: 'Introduction to WebAssembly',
        speakers: ['Dr. Alex W.E.B.'],
        category: ['Web Development', 'Performance'],
        duration: 60, // minutes
        description: 'A deep dive into the fundamentals of WebAssembly and its applications for high-performance web development.'
    },
    {
        id: 'talk2',
        title: 'Modern CSS Techniques',
        speakers: ['Ms. Style Sheet'],
        category: ['Web Development', 'Design'],
        duration: 60,
        description: 'Explore the latest and most effective CSS techniques for responsive and beautiful web interfaces.'
    },
    {
        id: 'talk3',
        title: 'Building Scalable Node.js APIs',
        speakers: ['Mr. Node J.S.', 'Ms. Express F.'],
        category: ['Backend', 'APIs'],
        duration: 60,
        description: 'Learn best practices for designing and building scalable and maintainable RESTful APIs with Node.js and Express.'
    },
    {
        id: 'lunch',
        title: 'Lunch Break',
        speakers: [],
        category: [],
        duration: 60,
        description: 'Enjoy a delicious lunch and network with fellow attendees.'
    },
    {
        id: 'talk4',
        title: 'Demystifying Cloud Deployments',
        speakers: ['Ms. Azure Cloud'],
        category: ['DevOps', 'Cloud'],
        duration: 60,
        description: 'Understand the intricacies of deploying applications to the cloud, covering various platforms and strategies.'
    },
    {
        id: 'talk5',
        title: 'Data Science with Python',
        speakers: ['Dr. Python Data'],
        category: ['Data Science', 'AI/ML'],
        duration: 60,
        description: 'An introduction to data science workflows using Python, covering data analysis, visualization, and machine learning.'
    },
    {
        id: 'talk6',
        title: 'The Future of Frontend Frameworks',
        speakers: ['Mr. React Vue'],
        category: ['Web Development', 'Frontend'],
        duration: 60,
        description: 'A look into the evolving landscape of frontend frameworks and what the future holds for web development.'
    }
];

const eventStartTime = '10:00 AM';

const generateSchedule = () => {
    const scheduleDiv = document.getElementById('schedule');
    scheduleDiv.innerHTML = ''; // Clear existing schedule

    let currentTime = new Date();
    const [hours, minutesPart] = eventStartTime.split(':');
    const [mins, ampm] = minutesPart.split(' ');
    currentTime.setHours(parseInt(hours) + (ampm === 'PM' && hours !== '12' ? 12 : 0));
    currentTime.setMinutes(parseInt(mins));
    currentTime.setSeconds(0);

    const filteredTalks = talks.filter(talk => {
        const searchInput = document.getElementById('category-search').value.toLowerCase();
        return searchInput === '' || talk.category.some(cat => cat.toLowerCase().includes(searchInput));
    });

    filteredTalks.forEach(talk => {
        const talkElement = document.createElement('div');
        talkElement.classList.add('talk-card');

        const startTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        currentTime.setMinutes(currentTime.getMinutes() + talk.duration);
        const endTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        talkElement.innerHTML = `
            <div class="talk-time">${startTime} - ${endTime}</div>
            <div class="talk-title">${talk.title}</div>
            <div class="talk-speakers">${talk.speakers.join(', ')}</div>
            <div class="talk-category">Categories: ${talk.category.join(', ')}</div>
            <div class="talk-description">${talk.description}</div>
        `;
        scheduleDiv.appendChild(talkElement);

        if (talk.id !== 'lunch' && talk !== filteredTalks[filteredTalks.length - 1]) { // Add transition for all but lunch and last talk
            currentTime.setMinutes(currentTime.getMinutes() + 10); // 10 minute transition
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    generateSchedule();
    document.getElementById('category-search').addEventListener('input', generateSchedule);
});
