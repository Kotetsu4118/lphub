<x-app-layout>
    <div align='center'>
        作成した問題
    </div>
    @component('components/questions_for_mypage', ['questions' => $questions, 'flag_type' => $flag_type, 'method' => 'delete'])@endcomponent
    
</x-app-layout>