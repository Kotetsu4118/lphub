<div class='py-4'>
    <form action='/questions/{{ $question->id }}/comment' method='POST'>
    @csrf
        <div>
            <x-input-label for="comment" :value="__('コメントを入力：')" />
            <x-text-input id='comment' name='comment' class="mt-1 block w-full h-20" :value="old('comment')" />
            <x-input-error :messages="$errors->get('comment')" class="mt-2" />
        </div>
        <div class='pt-2'>
            <x-primary-button>{{ __('保存') }}</x-primary-button>
        </div>
    </form>
</div>